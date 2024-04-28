"use client";

import { IRaid } from "@/lib/database/models/raid.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

import Checkout from "./Checkout";

const CheckoutButton = ({ raid }: { raid: IRaid }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasRaidFinished = new Date(raid.endDateTime) < new Date();
  return (
    <div className='flex items-center gap-3'>
      {hasRaidFinished ? (
        <p className='p-2 text-red-500'>
          Sorry, tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <button type='submit' className='button-secondary'>
              <Link
                href='/sign-in'
                className=' text-primary-50  flex items-center justify-center'
              >
                Login to Join Raid
              </Link>
            </button>
          </SignedOut>

          <SignedIn>
            <Checkout raid={raid} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
