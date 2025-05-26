import { Cart, Product, ShopifyCollection } from "./shopify/types";
import { baseUrl } from "./utils";

export const mockCart: Cart = {
  id: "cart123",
  checkoutUrl: `${baseUrl}`,
  cost: {
    subtotalAmount: {
      amount: "0.00",
      currencyCode: "USD",
    },
    totalAmount: {
      amount: "5.00",
      currencyCode: "USD",
    },
    totalTaxAmount: {
      amount: "5.00",
      currencyCode: "USD",
    },
  },
  totalQuantity: 0,
  lines: [],
};

export const mockProduct: Product = {
  // ─── db fields (from ShopifyProduct → db) ───
  id: "gid://shopify/Product/12345",
  createdAt: "2023-04-01T10:30:00Z",
  updatedAt: "2023-05-01T08:15:00Z",

  // ─── ShopifyProduct fields (excluding variants & images) ───
  handle: "cozy-hoodie",
  availableForSale: true,
  title: "Cozy Unisex Hoodie",
  description:
    "A super cozy unisex hoodie made from organic cotton. Great for everyday wear.",
  descriptionHtml:
    "<p>A super cozy unisex hoodie made from 100% organic cotton. Perfect for everyday wear.</p>",

  options: [
    {
      id: "opt-size",
      name: "Size",
      values: [
        { id: "size-s", value: "S" },
        { id: "size-m", value: "M" },
        { id: "size-l", value: "L" },
        { id: "size-xl", value: "XL" },
      ],
    },
    {
      id: "opt-color",
      name: "Color",
      values: [
        { id: "color-black", value: "Black" },
        { id: "color-gray", value: "Gray" },
        { id: "color-navy", value: "Navy" },
      ],
    },
  ],

  priceRange: {
    minVariantPrice: {
      amount: "49.99",
      currencyCode: "USD",
    },
    maxVariantPrice: {
      amount: "59.99",
      currencyCode: "USD",
    },
  },

  featuredImage: {
    url: "https://i.pinimg.com/736x/88/02/a0/8802a057509af360150e1236b3cf725c.jpg",
    altText: "Unisex Hoodie front view",
    width: 1000,
    height: 1200,
    isFeatured: true,
  },

  seo: {
    title: "Unisex Organic-Cotton Hoodie",
    description:
      "Grab our cozy unisex hoodie made from 100% organic cotton—perfect for any season.",
  },

  tags: ["hoodie", "unisex", "organic"],

  // ─── Full Collection object (must include db + ShopifyCollection + extra fields) ───
  collection: {
    // db fields:
    id: "gid://shopify/Collection/67890",
    createdAt: "2023-01-15T09:00:00Z",
    updatedAt: "2023-02-20T11:45:00Z",

    // ShopifyCollection fields:
    handle: "apparel",
    title: "Apparel",
    description:
      "Our curated selection of apparel, from cozy hoodies to seasonal tees.",
    seo: {
      title: "Apparel Collection",
      description:
        "Browse our full collection of apparel, including organic garments and timeless classics.",
    },

    // Additional Collection-specific fields:
    path: "/collections/apparel",
    // (optional) product?: Product[];  // you can omit or leave empty
  },

  // ─── Re-declared `variants` and `images` (for Product type) ───
  variants: [
    {
      id: "gid://shopify/ProductVariant/1234501",
      title: "Black / M",
      availableForSale: true,
      selectedOptions: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      price: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
    {
      id: "gid://shopify/ProductVariant/1234502",
      title: "Gray / L",
      availableForSale: false,
      selectedOptions: [
        { name: "Color", value: "Gray" },
        { name: "Size", value: "L" },
      ],
      price: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
  ],

  images: [
    {
      url: "https://i.pinimg.com/736x/88/02/a0/8802a057509af360150e1236b3cf725c.jpg",
      altText: "Black Hoodie",
      width: 800,
      height: 1000,
      isFeatured: true,
    },
    {
      url: "https://i.pinimg.com/236x/b5/ea/e2/b5eae2dfa18c26ad8ae9edb005d052cb.jpg",
      altText: "Gray Hoodie",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
  ],
};

export const mockProductShoes: Product = {
  // ─── db fields (from ShopifyProduct → db) ───
  id: "gid://shopify/Product/98767",
  createdAt: "2023-06-10T12:00:00Z",
  updatedAt: "2023-07-15T09:30:00Z",

  // ─── ShopifyProduct fields (excluding variants & images) ───
  handle: "mens-casual-flat",
  availableForSale: true,
  title: "MEN'S CASUAL FLAT",
  description:
    "A stylish and comfortable men's casual flat sneaker, perfect for everyday wear.",
  descriptionHtml:
    "<p>A stylish and comfortable men's casual flat sneaker, perfect for everyday wear.</p>",

  options: [
    {
      id: "opt-size-shoe",
      name: "Size",
      values: [
        { id: "size-8", value: "8" },
        { id: "size-9", value: "9" },
        { id: "size-10", value: "10" },
        { id: "size-11", value: "11" },
      ],
    },
    {
      id: "opt-color-shoe",
      name: "Color",
      values: [
        { id: "color-black-shoe", value: "Black" },
        { id: "color-gray-shoe", value: "Gray" },
        { id: "color-navy-shoe", value: "Navy" },
      ],
    },
  ],

  priceRange: {
    minVariantPrice: {
      amount: "69.99",
      currencyCode: "USD",
    },
    maxVariantPrice: {
      amount: "79.99",
      currencyCode: "USD",
    },
  },

  featuredImage: {
    url: "https://img.fantaskycdn.com/ad488760bd1f500d8a06d481354ee443_540x.jpeg",
    altText: "Men's Casual Flat Sneaker",
    width: 1000,
    height: 1200,
    isFeatured: true,
  },

  seo: {
    title: "MEN'S CASUAL FLAT SNEAKERS 08895075S",
    description:
      "Shop our men's casual flat sneakers—stylish lace-up footwear designed for comfort and durability.",
  },

  tags: ["shoes", "sneakers", "men", "casual"],

  // ─── Full Collection object ───
  collection: {
    id: "gid://shopify/Collection/99999",
    createdAt: "2023-05-01T08:00:00Z",
    updatedAt: "2023-06-20T14:45:00Z",
    handle: "footwear",
    title: "Footwear",
    description:
      "Explore our full range of footwear, from casual sneakers to formal shoes.",
    seo: {
      title: "Footwear Collection",
      description:
        "Browse our comprehensive footwear collection—stylish and comfortable shoes for every occasion.",
    },
    path: "/collections/footwear",
    // product?: Product[]  // optional, can be omitted or populated
  },

  // ─── Re-declared `variants` (for Product type) ───
  variants: [
    {
      id: "gid://shopify/ProductVariant/9876701",
      title: "Black / 9",
      availableForSale: true,
      selectedOptions: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "9" },
      ],
      price: {
        amount: "69.99",
        currencyCode: "USD",
      },
    },
    {
      id: "gid://shopify/ProductVariant/9876702",
      title: "Gray / 10",
      availableForSale: false,
      selectedOptions: [
        { name: "Color", value: "Gray" },
        { name: "Size", value: "10" },
      ],
      price: {
        amount: "69.99",
        currencyCode: "USD",
      },
    },
  ],

  // ─── Re-declared `images` (for Product type) ───
  images: [
    {
      url: "https://img.fantaskycdn.com/ad488760bd1f500d8a06d481354ee443_540x.jpeg",
      altText: "Black Casual Flat Sneaker",
      width: 800,
      height: 1000,
      isFeatured: true,
    },
    {
      url: "https://img.fantaskycdn.com/9e9a0f9e52c68ecc226089eee64ef207_2056x.jpeg",
      altText: "Gray Casual Flat Sneaker",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
    {
      url: "https://img.fantaskycdn.com/8a2dc25784dd27d1fe5d3688274c887b_540x.jpeg",
      altText: "Navy Casual Flat Sneaker",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
  ],
};

export const mockProductHeadwear: Product = {
  // ─── db fields (from ShopifyProduct → db) ───
  id: "gid://shopify/Product/98766",
  createdAt: "2023-05-20T14:00:00Z",
  updatedAt: "2023-06-10T09:30:00Z",

  // ─── ShopifyProduct fields (excluding variants & images) ───
  handle: "headwear",
  availableForSale: true,
  title: "Headwear",
  description:
    "A stylish organic-cotton beanie, perfect for keeping warm while looking great.",
  descriptionHtml:
    "<p>A stylish organic-cotton beanie, perfect for keeping warm while looking great.</p>",

  options: [
    {
      id: "opt-size-headwear",
      name: "Size",
      values: [
        { id: "size-s", value: "S" },
        { id: "size-m", value: "M" },
        { id: "size-l", value: "L" },
        { id: "size-xl", value: "XL" },
      ],
    },
    {
      id: "opt-color-headwear",
      name: "Color",
      values: [
        { id: "color-black", value: "Black" },
        { id: "color-gray", value: "Gray" },
        { id: "color-navy", value: "Navy" },
      ],
    },
  ],

  priceRange: {
    minVariantPrice: {
      amount: "29.99",
      currencyCode: "USD",
    },
    maxVariantPrice: {
      amount: "35.99",
      currencyCode: "USD",
    },
  },

  featuredImage: {
    url: "https://i.pinimg.com/736x/6a/9c/98/6a9c9887c6aa5b43c0b804c6dcc23216.jpg",
    altText: "Black Organic Beanie",
    width: 1000,
    height: 1200,
    isFeatured: true,
  },

  seo: {
    title: "Organic Cotton Beanie – Headwear",
    description:
      "Shop our organic-cotton beanie in multiple colors and sizes. Cozy, warm, and eco-friendly.",
  },

  tags: ["headwear", "beanie", "organic"],

  // ─── Full Collection object ───
  collection: {
    id: "gid://shopify/Collection/88888",
    createdAt: "2023-04-10T11:15:00Z",
    updatedAt: "2023-05-05T16:20:00Z",
    handle: "accessories",
    title: "Accessories",
    description:
      "Explore our curated selection of accessories, from beanies to scarves.",
    seo: {
      title: "Accessories Collection",
      description:
        "Browse our accessories collection—stylish beanies, scarves, and more.",
    },
    path: "/collections/accessories",
    // product?: Product[]  // optional
  },

  // ─── Re-declared `variants` (for Product type) ───
  variants: [
    {
      id: "gid://shopify/ProductVariant/9876601",
      title: "Black / M",
      availableForSale: true,
      selectedOptions: [
        { name: "Color", value: "Black" },
        { name: "Size", value: "M" },
      ],
      price: {
        amount: "29.99",
        currencyCode: "USD",
      },
    },
    {
      id: "gid://shopify/ProductVariant/9876602",
      title: "Gray / L",
      availableForSale: false,
      selectedOptions: [
        { name: "Color", value: "Gray" },
        { name: "Size", value: "L" },
      ],
      price: {
        amount: "29.99",
        currencyCode: "USD",
      },
    },
  ],

  // ─── Re-declared `images` (for Product type) ───
  images: [
    {
      url: "https://i.pinimg.com/736x/6a/9c/98/6a9c9887c6aa5b43c0b804c6dcc23216.jpg",
      altText: "Black Beanie",
      width: 800,
      height: 1000,
      isFeatured: true,
    },
    {
      url: "https://i.pinimg.com/236x/55/25/49/552549698d8fb909dd47ae4a0896245c.jpg",
      altText: "Gray Beanie",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
    {
      url: "https://img.fantaskycdn.com/8a2dc25784dd27d1fe5d3688274c887b_540x.jpeg",
      altText: "Navy Beanie",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
  ],
};

export const ShirtCollection: ShopifyCollection = {
  // ─── db fields (from ShopifyCollection → db) ───
  id: "gid://shopify/Collection/77777",
  createdAt: "2023-03-01T08:00:00Z",
  updatedAt: "2023-10-01T00:00:00Z",

  // ─── ShopifyCollection fields ───
  handle: "shirts",
  title: "Shirts",
  description: "Shirts",
  seo: {
    title: "Shirts",
    description: "Shirts",
  },
};

export const HeadWearCollection: ShopifyCollection = {
  // ─── db fields (from ShopifyCollection → db) ───
  id: "gid://shopify/Collection/44444",
  createdAt: "2023-02-15T10:00:00Z",
  updatedAt: "2023-10-01T00:00:00Z",

  // ─── ShopifyCollection fields ───
  handle: "headwear",
  title: "Headwear",
  description: "Headwear",
  seo: {
    title: "Headwear",
    description: "Headwear",
  },
};

export const mockCollections: ShopifyCollection[] = [
  {
    id: "gid://shopify/Collection/11111",
    createdAt: "2023-06-01T08:00:00Z",
    updatedAt: "2023-10-01T00:00:00Z",
    handle: "hoodies",
    title: "Hoodies",
    description: "A collection of cozy hoodies.",
    seo: {
      title: "Hoodies Collection",
      description: "Shop our range of comfortable hoodies.",
    },
  },
  {
    id: "gid://shopify/Collection/22222",
    createdAt: "2023-06-05T09:30:00Z",
    updatedAt: "2023-10-01T00:00:00Z",
    handle: "t-shirts",
    title: "T-Shirts",
    description: "A collection of stylish t-shirts.",
    seo: {
      title: "T-Shirts Collection",
      description: "Explore our trendy t-shirts.",
    },
  },
  ShirtCollection,
  HeadWearCollection,
];

export const products: Product[] = [
  mockProduct,
  mockProductHeadwear,
  mockProductShoes,
];
