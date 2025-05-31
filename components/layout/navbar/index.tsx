import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
// import { getMenu } from 'lib/shopify';
import { getAllCategories } from "@/requests/categories"; // Assuming this path is correct based on your structure
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import CategoriesDropdown from "./categories-dropdown"; // Import the new client component
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const { SITE_NAME } = process.env;

type Category = {
  id: string;
  name: string;
};

export async function Navbar() {
  const staticMenu: Menu[] = [
    {
      title: "All",
      path: "/search",
    },
    {
      title: "Shirts",
      path: "/",
    },
    {
      title: "Stickers",
      path: "/",
    },
  ];

  let categories: Category[] = [];
  try {
    categories = await getAllCategories();
  } catch (error) {
    console.error("Failed to fetch categories in Navbar:", error);
  }

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu
            menu={[...staticMenu, { title: "Categories", path: "#" }]}
          />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {SITE_NAME}
            </div>
          </Link>
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {/* Render static menu items */}
            {staticMenu.map((item: Menu) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  prefetch={true}
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {categories && categories.length > 0 && (
              <li>
                <CategoriesDropdown categories={categories} />
              </li>
            )}
          </ul>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <CartModal />
        </div>
      </div>
    </nav>
  );
}
