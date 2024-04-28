"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className='flex gap-2 max-w-[80%] lg:max-w-full'>
      <button
        className='button-nav-primary'
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        Previous
      </button>
      <button
        className='button-nav-primary'
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
