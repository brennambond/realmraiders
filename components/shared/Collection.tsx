import { IRaid } from "@/lib/database/models/raid.model";

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
  return <></>;
};

export default Collection;
