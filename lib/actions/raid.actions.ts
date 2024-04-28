"use server";

import {
  CreateRaidParams,
  DeleteRaidParams,
  GetAllRaidsParams,
  GetRaidsByUserParams,
  GetRelatedRaidsByCategoryParams,
  UpdateRaidParams,
} from "../../types/index";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Raid from "../database/models/raid.model";
import Category from "../database/models/category.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateRaid = async (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createRaid = async ({ raid, userId, path }: CreateRaidParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newRaid = await Raid.create({
      ...raid,
      category: raid.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newRaid));
  } catch (error) {
    console.log(error);
  }
};

export const getRaidById = async (raidId: string) => {
  try {
    await connectToDatabase();

    const raid = await populateRaid(Raid.findById(raidId));

    if (!raid) {
      throw new Error("Raid not found");
    }

    return JSON.parse(JSON.stringify(raid));
  } catch (error) {
    handleError(error);
  }
};

export async function getAllRaids({
  query,
  limit = 6,
  page,
  category,
}: GetAllRaidsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const raidsQuery = Raid.find(conditions)
      .sort({ category: "asc" })
      .skip(skipAmount)
      .limit(limit);

    const raids = await populateRaid(raidsQuery);
    const raidsCount = await Raid.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(raids)),
      totalPages: Math.ceil(raidsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function updateRaid({ userId, raid, path }: UpdateRaidParams) {
  try {
    await connectToDatabase();

    const raidToUpdate = await Raid.findById(raid._id);
    if (!raidToUpdate || raidToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or raid not found");
    }

    const updatedRaid = await Raid.findByIdAndUpdate(
      raid._id,
      { ...raid, category: raid.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedRaid));
  } catch (error) {
    handleError(error);
  }
}

export const deleteRaid = async ({ raidId, path }: DeleteRaidParams) => {
  try {
    await connectToDatabase();

    const deletedRaid = await Raid.findByIdAndDelete(raidId);

    if (deletedRaid) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export async function getRaidsByUser({
  userId,
  limit = 6,
  page,
}: GetRaidsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const raidsQuery = Raid.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const raids = await populateRaid(raidsQuery);
    const raidsCount = await Raid.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(raids)),
      totalPages: Math.ceil(raidsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED RIADS: RAIDS WITH SAME CATEGORY
export async function getRelatedRaidsByCategory({
  categoryId,
  raidId,
  limit = 3,
  page = 1,
}: GetRelatedRaidsByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: raidId } }],
    };

    const raidsQuery = Raid.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const raids = await populateRaid(raidsQuery);
    const raidsCount = await Raid.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(raids)),
      totalPages: Math.ceil(raidsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
