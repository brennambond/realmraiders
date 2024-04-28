import Image from "next/image";
import Link from "next/link";
import ParallaxSection from "./ParallaxSection";

const Hero = () => {
  return (
    <ParallaxSection
      sectionClassName='flex flex-col relative overflow-hidden pt-[60px] pb-[100px] blue-gradient'
      motionDivClassName='absolute inset-0 z-0 opacity-80'
      backgroundImage="url('/assets/images/backgroundWeapons.png')"
      backgroundPosition='bottom'
      backgroundSize='cover'
    >
      <div className='lg:pb-6 pt-20 w-[80%] max-w-[1080px] mx-auto flex-center flex-col z-[1]'>
        <div className='relative flex-center flex-col mb-2 lg:mb-6 mx-auto'>
          <h3 className='h3-special pb-8 lg:pb-12'>Prepare For Adventure</h3>
          <Image
            src='/assets/icons/mainlogo.svg'
            alt='logo'
            width={1000}
            height={1000}
            className='max-w-[300px] lg:max-w-[350px] bg-primary-900 rounded-full shadow-full z-10'
          />
        </div>
        <div className='py-8 text-center max-w-[800px] flex-center flex-col gap-8'>
          <h1 className='h1-bold'>Join, Fight, and Loot with Us Today</h1>
          <p className='p-regular-20'>
            Choose from any of our dozens of raids that span various ranks and
            locations, hosted by authenticated raiders from across our global
            community.
          </p>
          <div className='lg:pt-8'>
            <Link href='/raids' className='button-primary shadow-primary'>
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url('/assets/icons/swirl.svg')",
          backgroundSize: "100%",
          transform: "scale(-1, 1)",
        }}
        className='absolute  z-1 bottom-0 h-[100px] lg:h-[250px] w-full bg-no-repeat'
      />
    </ParallaxSection>
  );
};

export default Hero;
