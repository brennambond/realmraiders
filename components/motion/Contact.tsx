import Link from "next/link";
import ParallaxSection from "./ParallaxSection";

const Contact = () => {
  return (
    <ParallaxSection
      sectionClassName='flex-center flex-col relative blue-gradient py-[80px] md:pt-[200px] md:pb-[120px] overflow-hidden'
      motionDivClassName='absolute inset-0 z-0 bg-no-repeat opacity-80'
      backgroundImage="url('/assets/images/backgroundWeapons.png')"
      backgroundPosition='top'
      backgroundSize='cover'
    >
      <div
        style={{
          backgroundImage: "url('/assets/icons/swirl.svg')",
          backgroundSize: "100%",
          transform: "scale(1, -1)",
        }}
        className='absolute z-0 top-0 h-[150px] lg:h-[250px] w-full bg-no-repeat '
      />

      <div
        id='main_content'
        className='flex-center flex-col w-[90%] lg:w-[80%] max-w-[90%] lg:max-w-[80%] py-[30px] '
      >
        <div className='relative text-primary-50'>
          <h4 className='h4-special pb-5'>Adventure Awaits</h4>
          <h2 className='h3-bold md:text-[28px] md:leading-8 lg:h2-bold-t8 pb-5 lg:py-10'>
            Join our community and begin your adventure today!
          </h2>
        </div>

        <div className='pt-6 lg:pt-10 relative'>
          <Link href='/raids' className='button-primary shadow-primary'>
            Get Started
          </Link>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Contact;
