import { getRaidById } from "@/lib/actions/raid.actions";
import { SearchParamProps } from "@/types";
import type { Metadata } from "next";

const RaidDetails = () => {
  return <div>RaidDetails</div>;
};

export async function generateMetadata({
  params: { id },
}: SearchParamProps): Promise<Metadata> {
  const raid = await getRaidById(id);

  return {
    title: `Realm Raiders - ${raid.title}`,
  };
}

export default RaidDetails;
