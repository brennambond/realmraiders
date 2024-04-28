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

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";
import { useRouter } from "next/navigation";

type RaidFormProps = {
  userId: string;
  type: "Create" | "Update";
  raid?: IRaid;
  raidId?: string;
  headerText: string;
};

const RaidForm = ({
  userId,
  type,
  raid,
  raidId,
  headerText,
}: RaidFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    raid && type === "Update"
      ? {
          ...raid,
          startDateTime: new Date(raid.startDateTime),
          endDateTime: new Date(raid.endDateTime),
        }
      : raidDefaultValues;
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof raidFormSchema>>({
    resolver: zodResolver(raidFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof raidFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newRaid = await createRaid({
          raid: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });
        if (newRaid) {
          form.reset();
          router.push(`/raids/${newRaid._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!raidId) {
        router.back();
        return;
      }

      try {
        const updatedRaid = await updateRaid({
          raid: { ...values, imageUrl: uploadedImageUrl, _id: raidId },
          userId,
          path: `/raids/${raidId}`,
        });
        if (updatedRaid) {
          form.reset();
          router.push(`/raids/${updatedRaid._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col relative gap-5 text-primary-100 pt-10'
      >
        <h2 className='h2-bold py-10 md:leading-10 md:py-14'>{headerText}</h2>
        <div
          id='form__title-categId'
          className='flex-center flex-col gap-5 md:flex-row'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='w-full border  border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl>
                  <Input
                    placeholder='Raid Title'
                    {...field}
                    className='input-field p-form-20 text-primary-100'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem className='w-full border border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div id='form__desc-imageUrl' className='flex-center flex-col gap-5'>
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='w-full border border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl className='h-72'>
                  <Textarea
                    placeholder='Raid Description'
                    {...field}
                    className='textarea'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div
          id='form__imgURl-environment'
          className='flex flex-col gap-5 md:flex-row'
        >
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem className='w-full border border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl className='h-72'>
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='environment'
            render={({ field }) => (
              <FormItem className='w-full border border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-sm px-4 py-2 '>
                    <Image
                      src='/assets/icons/location-grey.svg'
                      alt='calendar'
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder='Raid Environment'
                      {...field}
                      className='input-field p-form-20 '
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div id='form__dates' className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name='startDateTime'
            render={({ field }) => (
              <FormItem className='w-full border border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl>
                  <div className='flex justify-start items-center h-[54px] w-full overflow-hidden rounded-sm px-4 py-2 '>
                    <Image
                      src='/assets/icons/calendar.svg'
                      alt='calendar'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap'>Start Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      dateFormat='MM/dd/yyyy h:mm aa'
                      wrapperClassName='datePicker'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDateTime'
            render={({ field }) => (
              <FormItem className='w-full border border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl>
                  <div className='flex justify-start items-center h-[54px] w-full overflow-hidden rounded-sm px-4 py-2 '>
                    <Image
                      src='/assets/icons/calendar.svg'
                      alt='calendar'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap'>End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      dateFormat='MM/dd/yyyy h:mm aa'
                      wrapperClassName='datePicker'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row' id='price_url'>
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full border border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl>
                  <div className='flex justify-start items-center h-[54px] w-full overflow-hidden rounded-sm px-4 py-2 '>
                    <Image
                      src='/assets/icons/dollar.svg'
                      alt='dollar'
                      width={24}
                      height={24}
                      className='filter-grey'
                    />
                    <Input
                      type='number'
                      placeholder='Price'
                      {...field}
                      className='p-regular-16 border-0 bg-white outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='w-full border border-gray-300 rounded-sm shadow-sm hover:shadow-md bg-white'>
                <FormControl>
                  <div className='flex-center h-[54px] w-full overflow-hidden rounded-sm px-4 py-2 '>
                    <Image
                      src='/assets/icons/link.svg'
                      alt='link'
                      width={24}
                      height={24}
                    />
                    <Input
                      placeholder='URL'
                      {...field}
                      className='input-field p-form-20'
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <button
          type='submit'
          disabled={form.formState.isSubmitting}
          className='button-primary  w-[275px] h-[48px] my-[2vw] self-center'
        >
          {form.formState.isSubmitting ? "Submitting..." : `${type} Your Raid`}
        </button>
      </form>
    </Form>
  );
};

export default RaidForm;
