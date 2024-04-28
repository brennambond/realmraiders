import { IRaid } from "@/lib/database/models/raid.model";
import { Raid } from "@/types";

export const headerLinks = [
  {
    label: "HOME",
    route: "/",
  },
  {
    label: "FIND A RAID",
    route: "/raids",
  },
  { label: "CREATE A RAID", route: "/raids/create" },
  {
    label: "MY PROFILE",
    route: "/profile",
  },
];

export const raidDefaultValues = {
  title: "",
  description: "",
  environment: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFeatured: false,
  url: "",
};

type raidColorProps = {
  raid: Raid;
};

export const raidColors = ({ raid }: raidColorProps) => {
  const color =
    raid?.category.name === "S"
      ? "orange"
      : raid?.category.name === "A"
      ? "red"
      : raid?.category.name === "B"
      ? "purple"
      : raid?.category.name === "C"
      ? "blue"
      : raid?.category.name === "D"
      ? "green"
      : raid?.category.name === "E"
      ? "brown"
      : "";

  return color;
};

type iRaidColorProps = {
  iRaid: IRaid;
};

export const iRaidColors = ({ iRaid }: iRaidColorProps) => {
  const color =
    iRaid?.category.name === "S"
      ? "orange"
      : iRaid?.category.name === "A"
      ? "red"
      : iRaid?.category.name === "B"
      ? "purple"
      : iRaid?.category.name === "C"
      ? "blue"
      : iRaid?.category.name === "D"
      ? "green"
      : iRaid?.category.name === "E"
      ? "brown"
      : "";

  return color;
};
