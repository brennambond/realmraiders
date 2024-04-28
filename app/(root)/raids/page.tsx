import { getAllRaids } from "@/lib/actions/raid.actions";
import { SearchParamProps } from "@/types";
import {
  CategoryFilter,
  Collection,
  CurlBottom,
  CurlTop,
  Search,
} from "@/components/shared";
import ParallaxSection from "@/components/motion/ParallaxSection";
import Contact from "@/components/motion/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realm Raiders - Find A Raid",
};

const Raids = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const raids = await getAllRaids({
    query: searchText,
    category,
    page,
    limit: 6,
  });
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
          <h3 className='h3-special py-5'>Raids</h3>
          <h1 className='h1-bold pb-5'>Join A Raid</h1>
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
        sectionClassName='flex flex-col relative overflow-hidden py-[80px] '
        motionDivClassName='-left-[500px] -top-[100px] absolute w-[1500px] h-[1500px] z-0'
        backgroundImage="url('/assets/icons/compass.svg')"
        backgroundPosition='center'
        backgroundSize='cover'
      >
        <CurlTop />
        <div className='bg-primary-700 p-8 flex-center flex-col relative'>
          <h2 className='h2-bold py-10 md:leading-10 md:py-14 xl:py-20'>
            Find your next adventure today
          </h2>

          <div className='flex-center items-stretch justify-between gap-8 mb-8 lg:gap-12 lg:mb-12 text-primary-50 max-w-[90%] md:max-w-[80%] w-full mx-auto'>
            <div className='flex flex-col w-[50%]'>
              <h4 className='h4-special pb-3'>Search</h4>
              <Search />
            </div>
            <div className='flex flex-col w-[50%]'>
              <h4 className='h4-special pb-3'>Category</h4>
              <CategoryFilter />
            </div>
          </div>

          <div className='mb-8 lg:max-w-[95%]'>
            <Collection
              data={raids?.data}
              emptyTitle='No Raids Found'
              emptyStateSubtext='Come back later'
              collectionType='All_Raids'
              limit={12}
              page={page}
              totalPages={raids?.totalPages}
            />
          </div>
        </div>
        <CurlBottom />
      </ParallaxSection>

      {/* CONTACT SECTION */}
      <Contact />
    </main>
  );
};

export default Raids;
