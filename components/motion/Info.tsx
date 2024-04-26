import {
  GiTavernSign,
  GiDrakkar,
  GiOpenTreasureChest,
  GiSverdIFjell,
} from "react-icons/gi";

import ParallaxSection from "./ParallaxSection";
import { CurlTop, CurlBottom } from "../shared";

const Info = () => {
  return (
    <ParallaxSection
      sectionClassName='flex flex-col relative overflow-hidden py-[80px] md:py-[200px]'
      motionDivClassName='-left-[300px] lg:-left-[600px] lg:-bottom-[200px] absolute overflow-hidden z-1 w-[1500px] h-[1500px]'
      backgroundImage="url('/assets/icons/compass.svg')"
      backgroundPosition='center'
      backgroundSize='cover'
    >
      <CurlTop />
      <div className='bg-primary-700 p-8 flex-center flex-col relative'>
        <div id='header_image' className='flex-center'>
          <span className='inline-flex-center'>
            <GiSverdIFjell size='160px' className='text-primary-900' />
          </span>
        </div>
        <h2 id='helper_slogan' className='h2-bold mb-6'>
          What we provide
        </h2>

        {/* maybe turn the below into a card component? */}
        <div className='py-6 grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4'>
          <div className='flex flex-col items-center gap-[1rem] pb-10'>
            <GiTavernSign size='100px' className='text-primary-900' />
            <h3 className='h3-bold'>Meet Fellow Raiders</h3>
            <p className='p-regular-20'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className='flex flex-col items-center gap-[1rem] pb-10'>
            <GiDrakkar size='100px' className='text-primary-900' />
            <h3 className='h3-bold'>Explore New Worlds</h3>
            <p className='p-regular-20'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className='flex flex-col items-center gap-[1rem] pb-10'>
            <GiOpenTreasureChest size='100px' className='text-primary-900 ' />
            <h3 className='h3-bold'>Bring Home the Loot</h3>
            <p className=' p-regular-20'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </div>

      <CurlBottom />
    </ParallaxSection>
  );
};

export default Info;
