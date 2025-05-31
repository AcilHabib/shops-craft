"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Category = {
  id: string;
  name: string;
};

interface CategoriesDropdownProps {
  categories: Category[];
}

export default function CategoriesDropdown({
  categories,
}: CategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <li ref={dropdownRef} className="relative">
      <button
        id="categories-menu-button"
        onClick={toggleDropdown}
        className="flex items-center text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Categories
        <svg
          className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 z-10" // Added z-index
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="categories-menu-button"
        >
          {categories.map((category) => (
            <li key={category.id} role="presentation">
              {" "}
              <Link
                href={`/categories/${category.id}`}
                prefetch={true}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                role="menuitem"
                onClick={handleItemClick}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
