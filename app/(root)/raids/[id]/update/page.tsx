import Contact from "@/components/motion/Contact";
import ParallaxSection from "@/components/motion/ParallaxSection";
import { CurlBottom, CurlTop } from "@/components/shared";
import RaidForm from "@/components/shared/RaidForm";
import { getRaidById } from "@/lib/actions/raid.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

type UpdateRaidProps = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "Realm Raiders - Update A Raid",
};

const UpdateRaid = async ({ params: { id } }: UpdateRaidProps) => {
  const raid = await getRaidById(id);

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <main className=' flex flex-col bg-primary-50'>
      {/* HEADER SECTION */}
      <ParallaxSection
        backgroundImage="url('/assets/images/backgroundWeapons.png')"
        backgroundPosition='top'
        backgroundSize='cover'
        sectionClassName='flex-center flex-col relative overflow-hidden pt-[80px] pb-[60px] lg:py-[120px] blue-gradient '
        motionDivClassName='absolute inset-0 bg-no-repeat opacity-80 z-0'
      >
        <div className='py-8 w-[80%] max-w-[1080px] relative text-center break-words text-primary-50 '>
          <h3 className='h3-special py-5'>Raids</h3>
          <h1 className='h1-bold pb-5'>Update A Raid</h1>
        </div>
        <div
          style={{
            backgroundImage: "url('/assets/icons/swirl.svg')",
            backgroundSize: "100%",
            transform: "scale(-1, 1)",
          }}
          className='absolute bottom-0 h-[100px] lg:h-[250px] w-full bg-no-repeat'
        />
      </ParallaxSection>

      {/* RAID FORM SECTION */}
      <ParallaxSection
        sectionClassName='flex flex-col relative py-[80px] overflow-hidden'
        motionDivClassName='-left-[500px] -top-[100px] absolute  w-[1500px] h-[1500px] z-0'
        backgroundImage="url('/assets/icons/compass.svg')"
        backgroundPosition='center'
        backgroundSize='cover'
      >
        <CurlTop />
        <div className='bg-primary-700 p-8 flex justify-center flex-col relative'>
          <RaidForm
            type='Update'
            raid={raid}
            raidId={raid._id}
            userId={userId}
            headerText='Update Your Raid Below'
          />
        </div>
        <CurlBottom />
      </ParallaxSection>
      <Contact />
    </main>
  );
};

export default UpdateRaid;
