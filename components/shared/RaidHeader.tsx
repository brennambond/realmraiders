import Image from "next/image";

import { FaCalendarDay } from "react-icons/fa";
import { formatDateTime } from "@/lib/utils";

import { GiTreasureMap, GiMagicPortal, GiWarlockEye } from "react-icons/gi";
import CheckoutButton from "./CheckoutButton";

interface ReactHeaderProps {
  raid: any;
  raidColor: string;
}

const RaidHeader = ({ raid, raidColor }: ReactHeaderProps) => {
  return (
    <section className='flex-center flex-col relative overflow-hidden pt-8 pb-20 xl:pt-[60px] xl:pb-[120px]'>
      <div
        style={{
          backgroundImage: `url('${raid.imageUrl}')`,
        }}
        className='z-0  bg-cover bg-center w-full h-full absolute brightness-50 opacity-90'
      />

      <div
        id='header-content'
        className='grid md:grid-flow-col col-span-1 md:col-span-2 md:gap-4 lg:gap-5 xl:gap-12 wrapper justify-center items-center relative'
      >
        {/* HEADER IMAGE */}
        <div
          id='header-content_raid-image'
          className='pb-10 pt-20 md:pb-16 md:pt-32 lg:pb-20 lg:pt-40 flex-center relative '
        >
          <Image
            src={raid.imageUrl}
            alt='hero-image'
            width={2000}
            height={2000}
            className=' rounded-[6px] 2xl:max-w-[600px]  lg:max-w-[500px] max-w-[400px] border-[1px] border-gray-800 shadow-full'
          />
        </div>

        {/* HEADER BODY */}
        <div
          id='card_info'
          className='flex flex-col py-6 px-8 gap-4 lg:gap-7 xl:gap-10 relative'
        >
          <div
            id='raid-descriptors'
            className='flex-center md:flex-start flex-wrap gap-2 lg:gap-3'
          >
            {raid.isFeatured == true ? (
              <div
                id='_raid-featured'
                className='inline-flex-center py-1 px-2 mb-1 gap-1 rounded-sm shadow-mini bg-primary-50'
              >
                <GiWarlockEye className='text-purple-500 descriptor-p' />
                <div className='p-bold-12-secondary  lg:p-bold-14-secondary'>
                  Featured
                </div>
              </div>
            ) : null}

            <div
              id='_raid-rank'
              className='inline-flex-center gap-1 mb-1 py-1 px-2 rounded-sm shadow-mini bg-primary-50'
            >
              <GiMagicPortal
                style={{ color: raidColor }}
                className='descriptor-p'
              />
              <div className='p-bold-12-secondary  lg:p-bold-14-secondary'>
                {raid?.category.name}
              </div>
            </div>

            <div
              id='_raid-environment'
              className='inline-flex-center gap-1 mb-1 py-1 px-2 rounded-sm shadow-mini bg-primary-50'
            >
              <GiTreasureMap className='text-blue-500 descriptor-p' />
              <div className='p-bold-12-secondary  lg:p-bold-14-secondary'>
                {raid.environment}
              </div>
            </div>
          </div>

          <div id='raid-title' className='flex'>
            <p className='h2-bold break-words md:text-start md:leading-10 text-primary-50'>
              {raid.title}
            </p>
          </div>

          <div
            id='raid_date-price'
            className='flex sm:flex-col md:items-start gap-4 lg:gap-7 xl:gap-10   w-full items-center justify-between'
          >
            <div id='raid-date' className='flex gap-2 lg:gap-3 items-center '>
              <FaCalendarDay className='w-4 h-4 lg:w-6 lg:h-6 text-primary-500' />{" "}
              <p className='p-semibold-18 text-primary-50'>
                {formatDateTime(raid.startDateTime).dateTime}
              </p>
            </div>

            <div className='bg-green-200 rounded-sm'>
              <span
                id='raid-price'
                className='p-semibold-18 lg:p-bold-20 text-[#165241] p-6 lg:p-8'
              >
                ${raid.price}
              </span>
            </div>
          </div>
          <div className='flex-center md:flex-start pt-2'>
            <CheckoutButton raid={raid} />
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url('/assets/icons/swirl.svg')",
          backgroundSize: "100%",
          transform: "scale(-1, 1)",
        }}
        className='absolute bottom-0 h-[100px] lg:h-[150px] w-full bg-no-repeat'
      />
    </section>
  );
};

export default RaidHeader;
