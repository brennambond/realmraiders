import { Contact, Hero, Info, Reviews, Starter } from "@/components/motion";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realm Raiders - Home",
};

export default function Home() {
  return (
    <main className='flex flex-col bg-primary-50'>
      <Hero />
      <Info />
      <Starter />
      <Reviews />
      <Contact />
    </main>
  );
}
