"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

import Dropdown from "./Dropdown";
import { FileUploader } from "./FileUploader";

import { createRaid, updateRaid } from "@/lib/actions/raid.actions";
import { IRaid } from "@/lib/database/models/raid.model";
import { raidFormSchema } from "@/lib/validator";
import { useUploadThing } from "@/lib/uploadthing";
import { raidDefaultValues } from "@/constants";

const RaidForm = () => {
  return <div>RaidForm</div>;
};

export default RaidForm;
