import Contact from "@/components/motion/Contact";
import ParallaxSection from "@/components/motion/ParallaxSection";
import { Collection, CurlBottom, CurlTop } from "@/components/shared";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { getRaidsByUser } from "@/lib/actions/raid.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Realm Raiders - Profile",
};

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const raidsPage = Number(searchParams?.raidsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedRaids = orders?.data.map((order: IOrder) => order.raid) || [];
  const organizedRaids = await getRaidsByUser({ userId, page: raidsPage });

  return (
    <main className='flex flex-col bg-primary-50'>
      {/* HEADER SECTION */}
      <ParallaxSection
        backgroundImage="url('/assets/images/backgroundWeapons.png')"
        backgroundPosition='top'
        backgroundSize='cover'
        sectionClassName='flex-center flex-col relative overflow-hidden py-[60px] md:py-[80px] lg:pt-[120px] lg:pb-[160px] blue-gradient z-10'
        motionDivClassName='absolute inset-0 bg-no-repeat opacity-80 z-0'
      >
        <div className='py-8 w-[80%] max-w-[1080px] relative text-center break-words text-primary-50 '>
          <h3 className='h3-special py-5'>User</h3>
          <h1 className='h1-bold pb-5'>Profile</h1>
        </div>

        <div
          style={{
            backgroundImage: "url('/assets/icons/swirl.svg')",
            backgroundSize: "100%",
            transform: "scale(-1, 1)",
          }}
          className='absolute bottom-0 h-[100px] lg:h-[250px] w-full bg-no-repeat'
        />
      </ParallaxSection>

      {/* CONTENT SECTION */}
      <ParallaxSection
        sectionClassName='flex flex-col relative py-[80px] overflow-hidden'
        motionDivClassName='-left-[500px] -top-[100px] absolute  w-[1500px] h-[1500px] z-0'
        backgroundImage="url('/assets/icons/compass.svg')"
        backgroundPosition='center'
        backgroundSize='cover'
      >
        <CurlTop />
        <div className='bg-primary-700 p-8 flex-center flex-col relative'>
          {/* My Tickets */}
          <h2 className='h2-bold py-10 md:leading-10 md:py-14'>
            Tickets Purchased
          </h2>

          <div className='wrapper my-4'>
            <Collection
              data={orderedRaids}
              emptyTitle='No Raid Tickets Purchased Yet'
              emptyStateSubtext='Check out our collection of Raids and purchase your ticket today'
              collectionType='My_Tickets'
              limit={3}
              page={ordersPage}
              urlParamName='ordersPage'
              totalPages={orders?.totalPages}
            />
          </div>

          <Link href='/raids' className='button-primary'>
            Find More Raids
          </Link>
        </div>
        <CurlBottom />
      </ParallaxSection>

      <section className='flex flex-col relative py-[80px] '>
        <CurlTop />
        <div className='bg-primary-700 p-8 flex-center flex-col relative'>
          {/* Raids Organized */}

          <h2 className='h2-bold py-10 md:leading-10 md:py-14'>
            Raids Organized
          </h2>

          <div className='wrapper my-4'>
            <Collection
              data={organizedRaids?.data}
              emptyTitle='No Raids Have Been Created Yet'
              emptyStateSubtext='Create your very own raid at any time'
              collectionType='Raids_Organized'
              limit={6}
              page={raidsPage}
              urlParamName='raidsPage'
              totalPages={organizedRaids?.totalPages}
            />
          </div>

          <Link href='/raids/create' className='button-primary'>
            Create More Raids
          </Link>
        </div>
        <CurlBottom />
      </section>

      {/* CONTACT SECTION */}
      <Contact />
    </main>
  );
};

export default ProfilePage;
