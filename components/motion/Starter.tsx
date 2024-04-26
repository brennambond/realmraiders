import ParallaxSection from "./ParallaxSection";
import { StarterCard } from "../shared";

const Starter = () => {
  return (
    <ParallaxSection
      sectionClassName='flex-center flex-col relative overflow-hidden py-[80px] md:py-[200px] blue-gradient'
      motionDivClassName='absolute inset-0 z-0 bg-no-repeat opacity-80'
      backgroundImage="url('/assets/images/backgroundWeapons.png')"
      backgroundPosition='top'
      backgroundSize='cover'
    >
      <div
        style={{
          backgroundImage: "url('/assets/icons/swirl.svg')",
          backgroundSize: "100%",
          transform: "scale(-1, -1)",
        }}
        className='absolute z-1 top-0 h-[100px] lg:h-[250px] w-full bg-no-repeat '
      />

      <div className='flex-center flex-col pt-14'>
        <div id='starter_heading' className='pb-[30px] max-w-[1080px] relative'>
          <h2 className='h2-bold pb-3'>Where to start</h2>
        </div>

        <div
          id='cards'
          className='pt-7 max-w-[1440px] flex-center flex-col lg:flex-row gap-8 lg:gap-20 w-[80%]'
        >
          <StarterCard
            cardImage='/assets/images/findRaid.png'
            cardTitle='Join a raid'
            cardText='Choose from one of our dozens of raids to join'
            buttonLink='/raids'
            buttonText='Join'
          />

          <StarterCard
            cardImage='/assets/images/createRaid.png'
            cardTitle='Create a raid'
            cardText='Create your own raid for other raiders to join'
            buttonLink='/raids/create'
            buttonText='Create'
          />
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Starter;
