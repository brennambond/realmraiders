import Image from "next/image";
import Link from "next/link";

interface StarterCardProps {
  cardImage: string;
  cardTitle: string;
  cardText: string;
  buttonLink: string;
  buttonText: string;
}

const StarterCard = ({
  cardImage,
  cardTitle,
  cardText,
  buttonLink,
  buttonText,
}: StarterCardProps) => {
  return (
    <div id='card-1' className='mb-7 flex-center flex-col'>
      <div
        id='card_content'
        className='bg-primary-50 pb-10 flex-center flex-col rounded-lg relative shadow-primary overflow-hidden'
      >
        <Image
          src={`${cardImage}`}
          alt={`${cardTitle}`}
          width={2000}
          height={2000}
          className='mb-6 object-cover object-center max-h-[150px] md:max-h-[200px] lg:max-h-[250px] '
        />

        <div
          id='card_text'
          className='flex-center flex-col w-[90%] py-4 lg:py-6 gap-2 lg:gap-4'
        >
          <h3 className='h3-bold-secondary mb-[10px]'>{cardTitle}</h3>
          <p className='p-regular-20-secondary'>{cardText}</p>
        </div>
      </div>
      <div id='card_button' className='mb-0 text-center -mt-[10px] relative'>
        <Link
          href={`${buttonLink}`}
          className=' button-secondary shadow-primary'
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default StarterCard;
