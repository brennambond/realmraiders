"use client";

import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      let removeUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["page", "category"],
      });
      newUrl = formUrlQuery({
        params: removeUrl,
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category", "page"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className='flex-center py-2 w-full rounded-sm bg-white px-3 shadow-full border border-gray-400'>
      <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className='p-regular-16 border-0 bg-white input-field text-grey-500 '>
          <SelectValue placeholder='Category' />
        </SelectTrigger>
        <SelectContent className='rounded-sm '>
          <SelectItem
            value='All'
            className='select-item p-regular-14 rounded-sm'
          >
            All
          </SelectItem>

          {categories.map((category) => (
            <SelectItem
              value={category.name}
              key={category._id}
              className='select-item p-regular-14 rounded-sm'
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
