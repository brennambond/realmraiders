import {
  GiTiedScroll,
  GiHawkEmblem,
  GiBeerHorn,
  GiSecretBook,
} from "react-icons/gi";
import { CurlBottom, CurlTop } from "../shared";
import ParallaxSection from "./ParallaxSection";

const Reviews = () => {
  return (
    <ParallaxSection
      sectionClassName='flex flex-col relative overflow-hidden py-[80px] md:py-[200px]'
      motionDivClassName='-right-[600px] -bottom-[100px] absolute overflow-hidden z-1 w-[1500px] h-[1500px]'
      backgroundImage="url('/assets/icons/compass.svg')"
      backgroundPosition='center'
      backgroundSize='cover'
    >
      <CurlTop />
      <div className='flex flex-col relative'>
        <div className='bg-primary-700  p-8 flex-center flex-col'>
          <span id='header_image' className='flex-center mb-6'>
            <GiSecretBook size='160px' className='text-primary-900' />
          </span>
          <h2 id='helper_slogan' className='h2-bold mb-6'>
            Praise For Realm Raiders
          </h2>

          <div
            id='reviews'
            className='py-6 lg:py-10 grid md:grid-cols-3 grid-cols-1 gap-8 '
          >
            <div id='review_1' className='flex-center flex-col gap-4 '>
              <h3 className='h3-bold italic'>"Amazing Experience!"</h3>
              <p className='p-normal-20'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className='flex-center mt-[10px]'>
                <div className='w-[60px] relative flex-center'>
                  <GiHawkEmblem
                    size='50px'
                    className='text-primary-900 absolute'
                  />
                </div>
                <div className='font-semibold text-primary-50 text-[22px] text-left'>
                  - Jacob O.
                </div>
              </div>
            </div>

            <div
              id='review_2'
              className='flex-center flex-col gap-4 mt-10 md:mt-0'
            >
              <h3 className='h3-bold italic'>"I Love Realm Raiders!"</h3>
              <p className='p-normal-20'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className='flex-center mt-[10px]'>
                <div className='w-[60px] relative flex-center'>
                  <GiTiedScroll
                    size='50px'
                    className='text-primary-900 absolute'
                  />
                </div>
                <div className='font-semibold text-primary-50 text-[22px] text-left'>
                  - Amy S.
                </div>
              </div>
            </div>

            <div
              id='review_3'
              className='flex-center flex-col gap-4 mt-10 md:mt-0'
            >
              <h3 className='h3-bold italic'> "The Best there is!"</h3>
              <p className='p-normal-20'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className='flex-center mt-[10px]'>
                <div className='w-[60px] relative flex-center'>
                  <GiBeerHorn
                    size='50px'
                    className='text-primary-900 absolute'
                  />
                </div>
                <div className='font-semibold text-primary-50 text-[22px] text-left'>
                  - Eric R.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CurlBottom />
    </ParallaxSection>
  );
};

export default Reviews;
