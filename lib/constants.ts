import { useTranslations } from "next-intl";

export const t = useTranslations("locale");

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: "RELEVANCE" | "BEST_SELLING" | "CREATED_AT" | "PRICE";
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: t("36"),
  slug: null,
  sortKey: "RELEVANCE",
  reverse: false,
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: t("t37"),
    slug: "trending-desc",
    sortKey: "BEST_SELLING",
    reverse: false,
  }, // asc
  {
    title: t("t38"),
    slug: "latest-desc",
    sortKey: "CREATED_AT",
    reverse: true,
  },
  { title: t("39"), slug: "price-asc", sortKey: "PRICE", reverse: false }, // asc
  { title: t("t40"), slug: "price-desc", sortKey: "PRICE", reverse: true },
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-01/graphql.json";
