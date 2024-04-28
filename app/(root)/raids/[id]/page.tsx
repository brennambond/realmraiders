import {
  getRaidById,
  getRelatedRaidsByCategory,
} from "@/lib/actions/raid.actions";
import { SearchParamProps } from "@/types";

import { raidColors } from "@/constants";

import type { Metadata } from "next";
import {
  CheckoutButton,
  Collection,
  CurlBottom,
  CurlTop,
  RaidHeader,
} from "@/components/shared";
import { Contact, ParallaxSection } from "@/components/motion";

const RaidDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const raid = await getRaidById(id);
  const page = Number(searchParams?.page) || 1;
  const raidColor = raidColors({ raid });

  const relatedRaids = await getRelatedRaidsByCategory({
    categoryId: raid.category._id,
    raidId: raid._id,
    page: page,
  });

  return (
    <main className=' flex flex-col bg-primary-50'>
      <RaidHeader raid={raid} raidColor={raidColor} />

      <ParallaxSection
        sectionClassName='flex flex-col relative py-[80px] overflow-hidden'
        motionDivClassName='-left-[500px] -top-[100px] absolute  w-[1500px] h-[1500px] z-0'
        backgroundImage="url('/assets/icons/compass.svg')"
        backgroundPosition='center'
        backgroundSize='cover'
      >
        <CurlTop />
        <div className='bg-primary-700 p-8 flex justify-center flex-col relative '>
          <div className='flex justify-center flex-col py-[80px] overflow-hidden  bg-primary-50 rounded-md'>
            <h2 className='h2-bold-secondary-t8'>
              Embark on Your Next Adventure
            </h2>
            <div
              id='marketplace-item__description'
              className='flex items-start justify-center flex-col mt-12 wrapper'
            >
              <p className='p-regular-16 text-primary-100 leading-5 lg:p-regular-18 mb-[15px]'>
                {raid.description}
              </p>

              <h3 className='h3-bold-tertiary mt-8 '>Details:</h3>
              <ul className='list-disc list-inside pl-3 md:pl-6 lg:pl-12 pt-4 text-primary-100 gap-1'>
                {raid.isFeatured == true ? (
                  <li className='list-item'>
                    <span className='p-bold-18 uppercase text-purple-500'>
                      Featured Raid
                    </span>
                  </li>
                ) : null}

                <li className=' list-item p-semibold-18 '>
                  Raid Rank:{" "}
                  <span
                    className='pl-2 p-bold-18 '
                    style={{ color: raidColor }}
                  >
                    {raid.category.name}
                  </span>
                </li>
                <li className=' list-item p-semibold-18'>
                  Environment:{" "}
                  <span className='pl-2 p-bold-16 lg:p-bold-18 text-blue-500'>
                    {raid.environment}
                  </span>
                </li>
              </ul>
            </div>
            <div className='flex-center pt-6 lg:pt-12'>
              <CheckoutButton raid={raid} />
            </div>
          </div>
          <div className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
            <h2 className='h2-bold'>More {raid.category.name}-Ranked Raids</h2>
            <Collection
              data={relatedRaids?.data}
              emptyTitle='No Raids Found'
              emptyStateSubtext='Come back later'
              collectionType='All_Raids'
              limit={3}
              page={page}
              totalPages={relatedRaids?.totalPages}
            />
          </div>
        </div>
        <CurlBottom />
      </ParallaxSection>
      <Contact />
    </main>
  );
};

export async function generateMetadata({
  params: { id },
}: SearchParamProps): Promise<Metadata> {
  const raid = await getRaidById(id);

  return {
    title: `Realm Raiders - ${raid.title}`,
  };
}

export default RaidDetails;
