"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let newUrl = "";
    if (query) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "query",
        value: query,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["query"],
      });
    }
    router.push(newUrl, { scroll: false });
  }, [query, searchParams, router]);

  return (
    <div className='flex-center py-2 w-full max-w-[100%] lg:max-w-[90%] relative rounded-sm bg-white px-3 shadow-full border border-gray-400'>
      <Image
        src='/assets/icons/search.svg'
        alt='search'
        width={24}
        height={24}
      />
      <Input
        type='text'
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className='p-regular-16 border-0 bg-white input-field text-primary-100 '
      />
    </div>
  );
};

export default Search;
