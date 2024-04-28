import { IRaid } from "@/lib/database/models/raid.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { GiClick } from "react-icons/gi";
import DeleteConfirmation from "./DeleteConfirmation";
import { iRaidColors } from "@/constants";
import { GiTreasureMap, GiMagicPortal, GiWarlockEye } from "react-icons/gi";
import { FaCalendarDay } from "react-icons/fa";

type CardProps = {
  raid: IRaid;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ raid, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isRaidCreator = userId === raid.organizer._id.toString();

  const iRaid = raid;
  const raidColor = iRaidColors({ iRaid });

  return (
    <div className='flex flex-col min-h-[380px] lg:min-h-[440px] max-w-[400px] w-full h-full rounded-lg bg-white shadow-primary relative'>
      <div
        style={{ backgroundImage: `url(${raid.imageUrl})` }}
        className='bg-cover bg-center rounded-t-lg h-[50%] '
      />

      {/* IS RAID CREATOR */}
      {isRaidCreator && !hasOrderLink && (
        <div
          id='card_update-delete'
          className='absolute right-2 top-2 flex-center flex-col gap-4 rounded-xl bg-white p-3 shadow-primary'
        >
          <Link href={`/raids/${raid._id}/update`}>
            <GiClick className='text-primary-500 w-6 h-6 ' />
          </Link>
          <div className='border-b border-gray-200 w-full' />
          <DeleteConfirmation raidId={raid._id} />
        </div>
      )}

      <div id='card_info' className='flex flex-col py-6 px-8 gap-2 xl:gap-3 '>
        <div
          id='raid-descriptors'
          className='flex-center lg:flex-start flex-wrap gap-1 xl:gap-2'
        >
          {raid.isFeatured == true ? (
            <div
              id='_raid-featured'
              className='inline-flex-center  py-1 px-2 mb-1 rounded-sm shadow-mini bg-primary-800'
            >
              <GiWarlockEye className='text-purple-500 p-descriptor' />
              <div className='p-bold-12 xl:p-bold-14'>Featured</div>
            </div>
          ) : null}

          <div
            id='_raid-rank'
            className='inline-flex-center mb-1 py-1 px-2 rounded-sm shadow-mini bg-primary-700'
          >
            <GiMagicPortal
              style={{ color: raidColor }}
              className='p-descriptor'
            />
            <div className='p-bold-12 xl:p-bold-14'>{raid?.category.name}</div>
          </div>

          <div
            id='_raid-environment'
            className='inline-flex-center mb-1 py-1 px-2 rounded-sm shadow-mini bg-primary-700'
          >
            <GiTreasureMap className='text-blue-500 p-descriptor' />
            <div className='p-bold-12 xl:p-bold-14'>{raid.environment}</div>
          </div>
        </div>

        <Link id='raid-title' className=' z-[1]' href={`/raids/${raid._id}`}>
          <p className='p-bold-24 break-words text-center lg:text-start text-primary-600 hover:text-primary-700'>
            {raid.title}
          </p>
        </Link>

        <div
          id='raid_date-price'
          className='flex lg:flex-col lg:items-start lg:gap-4 xl:gap-6 w-full items-center justify-between'
        >
          <div id='raid-date' className='flex gap-2 lg:gap-3 items-center '>
            <FaCalendarDay className='w-[16px] h-[16px] text-primary-600' />{" "}
            <p className='p-medium-16 text-primary-100'>
              {formatDateTime(raid.startDateTime).dateTime}
            </p>
          </div>

          {!hidePrice && (
            <div className='bg-[#165241] rounded-sm'>
              <span
                id='raid-price'
                className='p-semibold-18 text-primary-50 px-4 py-2'
              >
                ${raid.price}
              </span>
            </div>
          )}
        </div>

        <div className='flex flex-col gap-1 '>
          <div id='raid-organizer' className='flex gap-2 lg:gap-3 items-center'>
            <p className=' text-primary-100 p-medium-16 lg:p-medium-18'>
              Organizer:
            </p>
            <span className='text-primary-900 p-bold-16'>
              {raid.organizer.firstName} {raid.organizer.lastName}
            </span>
          </div>

          {hasOrderLink && (
            <Link
              href={`/orders?raidId=${raid._id}`}
              target='_blank'
              className='flex gap-2'
            >
              <p className='text-primary-600 p-medium-16 lg:p-medium-18'>
                Order Details:
              </p>
              <Image
                src='/assets/icons/arrow.svg'
                alt='search'
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
