"use client";

import { useEffect } from "react";
import { IRaid } from "@/lib/database/models/raid.model";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ raid, userId }: { raid: IRaid; userId: string }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      raidTitle: raid.title,
      raidId: raid._id,
      price: raid.price,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };
  return (
    <form action={onCheckout} method='post'>
      <button type='submit' role='lnk' className='button-secondary '>
        Join the Raid
      </button>
    </form>
  );
};

export default Checkout;
