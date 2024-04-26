import Image from "next/image";

const CurlTop = () => {
  return (
    <div className='mb-0 w-full mx-auto max-w-[3000px] relative'>
      <Image
        src='/assets/icons/curlTopBlue.svg'
        alt='Curl Top'
        width={1000}
        height={1000}
        className='w-full max-w-full block h-auto'
      />
    </div>
  );
};

export default CurlTop;
