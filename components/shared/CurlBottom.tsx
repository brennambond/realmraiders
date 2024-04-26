import Image from "next/image";

const CurlBottom = () => {
  return (
    <div className='mt-0 w-full mx-auto max-w-[3000px] relative'>
      <Image
        src='/assets/icons/curlBottomBlue.svg'
        alt='Curl Bottom'
        width={1000}
        height={1000}
        className='w-full max-w-full block h-auto'
      />
    </div>
  );
};

export default CurlBottom;
