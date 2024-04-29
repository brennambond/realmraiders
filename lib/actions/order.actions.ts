"use server";

import {
  CheckoutOrderParams,
  CreateOrderParams,
  GetOrdersByRaidParams,
  GetOrdersByUserParams,
} from "../../types/index";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Order from "../database/models/order.model";
import { ObjectId } from "mongodb";
import Raid from "../database/models/raid.model";
import User from "../database/models/user.model";
import Category from "../database/models/category.model";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.raidTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        raidId: order.raidId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
      ...order,
      raid: order.raidId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export async function getOrdersByRaid({
  searchString,
  raidId,
}: GetOrdersByRaidParams) {
  try {
    await connectToDatabase();

    if (!raidId) throw new Error("Raid ID is required");
    const raidObjectId = new ObjectId(raidId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "raids",
          localField: "raid",
          foreignField: "_id",
          as: "raid",
        },
      },
      {
        $unwind: "$raid",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          raidTitle: "$raid.title",
          raidId: "$raid._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { raidId: raidObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}

export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct("raid._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate([
        {
          path: "raid",
          model: Raid,
          populate: [
            {
              path: "organizer",
              model: User,
              select: "_id firstName lastName",
            },
            {
              path: "category",
              model: Category,
              select: "name",
            },
          ],
        },
      ]);

    const ordersCount = await Order.distinct("raid._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
