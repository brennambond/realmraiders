"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className='flex-center flex h-72 cursor-pointer flex-col overflow-hidden rounded-sm bg-white'
    >
      <input {...getInputProps()} className='cursor-pointer' />

      {imageUrl ? (
        <div className='flex h-full w-full flex-1 justify-center '>
          <img
            src={imageUrl}
            alt='image'
            width={250}
            height={250}
            className='w-full object-cover object-center'
          />
        </div>
      ) : (
        <div className='flex-center flex-col py-5 text-grey-500'>
          <img
            src='/assets/icons/upload.svg'
            width={77}
            height={77}
            alt='file upload'
          />
          <h3 className='mb-2 mt-2'>Drag photo here</h3>
          <p className='p-medium-12 mb-4'>SVG, PNG, JPG</p>
          <button
            type='submit'
            className='button-secondary flex-center cursor-pointer  w-[325px] h-[48px]  my-[2vw] '
          >
            Select From Computer
          </button>
        </div>
      )}
    </div>
  );
}
