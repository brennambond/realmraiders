import { IRaid } from "@/lib/database/models/raid.model";
import { Card } from ".";
import Pagination from "./Pagination";

type CollectionProps = {
  data: IRaid[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Raids_Organized" | "My_Tickets" | "All_Raids";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className='flex-center flex-col  gap-10 '>
          <ul className='grid w-full h-full grid-cols-1 gap-5 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
            {data.map((raid) => {
              const hasOrderLink = collectionType === "My_Tickets";
              const hidePrice = collectionType === "Raids_Organized";

              return (
                <li key={raid._id} className='flex-center'>
                  <Card
                    raid={raid}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] py-28 text-center bg-primary-50'>
          <h3 className='h3-bold-secondary'>{emptyTitle}</h3>
          <p className='p-regular-18 text-primary-100'>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
