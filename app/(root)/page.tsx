import { Hero, Info, Starter } from "@/components/motion";

export default function Home() {
  return (
    <main className='flex flex-col bg-primary-50'>
      <Hero />
      <Info />
      <Starter />
    </main>
  );
}
