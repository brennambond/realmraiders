// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== RAID PARAMS
export type CreateRaidParams = {
  userId: string;
  raid: {
    title: string;
    description: string;
    environment: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFeatured: boolean;
    url: string;
  };
  path: string;
};

export type UpdateRaidParams = {
  userId: string;
  raid: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    environment: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFeatured: boolean;
    url: string;
  };
  path: string;
};

export type DeleteRaidParams = {
  raidId: string;
  path: string;
};

export type GetAllRaidsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetRaidsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type GetRelatedRaidsByCategoryParams = {
  categoryId: string;
  raidId: string;
  limit?: number;
  page: number | string;
};

export type Raid = {
  _id: string;
  title: string;
  description: string;
  price: string;
  isFeatured: boolean;
  imageUrl: string;
  environment: string;
  startDateTime: Date;
  endDateTime: Date;
  url: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: {
    _id: string;
    name: string;
  };
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};

// ====== ORDER PARAMS
export type CheckoutOrderParams = {
  raidTitle: string;
  raidId: string;
  price: string;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  raidId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type GetOrdersByRaidParams = {
  raidId: string;
  searchString: string;
};

export type GetOrdersByUserParams = {
  userId: string | null;
  limit?: number;
  page: string | number | null;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  keysToRemove?: string[];
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  key?: string;
  keysToRemove: string[];
  value?: string | null;
};

export type SearchParamProps = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
