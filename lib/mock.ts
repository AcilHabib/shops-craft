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
  id: "gid://shopify/Product/98765",
  handle: "shirt",
  title: "Shirt",
  description: "A super cozy unisex hoodie made from organic cotton.",
  featuredImage: {
    url: "https://i.pinimg.com/736x/88/02/a0/8802a057509af360150e1236b3cf725c.jpg",
    altText: "Unisex Hoodie front view",
    width: 1000,
    height: 1200,
    isFeatured: true,
  },
  seo: {
    title: "Unisex Hoodie - Organic Cotton",
    description: "Shop the ultimate unisex hoodie made from 100% organic cotton. Perfect for everyday wear.",
  },
  options: [
    {
      id: "opt1",
      name: "Size",
      values: [
        { id: "s", value: "S" },
        { id: "m", value: "M" },
        { id: "l", value: "L" },
        { id: "xl", value: "XL" },
      ],
    },
    {
      id: "opt2",
      name: "Color",
      values: [
        { id: "black", value: "Black" },
        { id: "gray", value: "Gray" },
        { id: "navy", value: "Navy" },
      ],
    },
  ],
  variants: [
    {
      id: "gid://shopify/ProductVariant/9876501",
      title: "Black / M",
      availableForSale: true,
      selectedOptions: [
        {
          name: "Color",
          value: "Black",
        },
        {
          name: "Size",
          value: "M",
        },
      ],
      price: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
    {
      id: "gid://shopify/ProductVariant/9876502",
      title: "Gray / L",
      availableForSale: false,
      selectedOptions: [
        {
          name: "Color",
          value: "Gray",
        },
        {
          name: "Size",
          value: "L",
        },
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
  availableForSale: true,
  descriptionHtml: "<p>A super cozy unisex hoodie made from organic cotton.</p>",
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
  tags: ["hoodie", "unisex", "organic"],
  updatedAt: "2023-01-01T00:00:00Z",
};

export const mockProductShoes: Product = {
  id: "gid://shopify/Product/98767",
  handle: "men's-casual-flat",
  title: "MEN'S CASUAL FLAT",
  description: "A super cozy unisex hoodie made from organic cotton.",
  featuredImage: {
    url: "https://img.fantaskycdn.com/ad488760bd1f500d8a06d481354ee443_540x.jpeg",
    altText: "Unisex Hoodie front view",
    width: 1000,
    height: 1200,
    isFeatured: true,
  },
  seo: {
    title: "MEN'S CASUAL FLAT FASHION LACE-UP SNEAKERS 08895075S",
    description: 'Shop the ultimate unisex hoodie made from 100% organic cotton. Perfect for everyday wear.',
  },
  options: [
    {
      id: "opt1",
      name: "Size",
      values: [
        { id: "s", value: "S" },
        { id: "m", value: "M" },
        { id: "l", value: "L" },
        { id: "xl", value: "XL" },
      ],
    },
    {
      id: "opt2",
      name: "Color",
      values: [
        { id: "black", value: "Black" },
        { id: "gray", value: "Gray" },
        { id: "navy", value: "Navy" },
      ],
    },
  ],
  variants: [
    {
      id: "gid://shopify/ProductVariant/9876501",
      title: "Black / M",
      availableForSale: true,
      selectedOptions: [
        {
          name: "Color",
          value: "Black",
        },
        {
          name: "Size",
          value: "M",
        },
      ],
      price: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
    {
      id: "gid://shopify/ProductVariant/9876502",
      title: "Gray / L",
      availableForSale: false,
      selectedOptions: [
        {
          name: "Color",
          value: "Gray",
        },
        {
          name: "Size",
          value: "L",
        },
      ],
      price: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
  ],
  images: [
    {
      url: "https://img.fantaskycdn.com/ad488760bd1f500d8a06d481354ee443_540x.jpeg",
      altText: "Black Hoodie",
      width: 800,
      height: 1000,
      isFeatured: true,
    },
    {
      url: "https://img.fantaskycdn.com/9e9a0f9e52c68ecc226089eee64ef207_2056x.jpeg",
      altText: "Gray Hoodie",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
    {
      url: "https://img.fantaskycdn.com/8a2dc25784dd27d1fe5d3688274c887b_540x.jpeg",
      altText: "Gray Hoodie",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
  ],
  availableForSale: true,
  descriptionHtml: "<p>A super cozy unisex hoodie made from organic cotton.</p>",
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
  tags: ["hoodie", "unisex", "organic"],
  updatedAt: "2023-01-01T00:00:00Z",
};

export const mockProductHeadwear: Product = {
  id: "gid://shopify/Product/98766",
  handle: "headwear",
  title: "Headwear",
  description: "A super cozy unisex hoodie made from organic cotton.",
  featuredImage: {
    url: "https://i.pinimg.com/736x/6a/9c/98/6a9c9887c6aa5b43c0b804c6dcc23216.jpg",
    altText: "Unisex Hoodie front view",
    width: 1000,
    height: 1200,
    isFeatured: true,
  },
  seo: {
    title: "Headwear - Organic Cotton",
    description: "Shop the ultimate unisex hoodie made from 100% organic cotton. Perfect for everyday wear.",
  },
  options: [
    {
      id: "opt1",
      name: "Size",
      values: [
        { id: "s", value: "S" },
        { id: "m", value: "M" },
        { id: "l", value: "L" },
        { id: "xl", value: "XL" },
      ],
    },
    {
      id: "opt2",
      name: "Color",
      values: [
        { id: "black", value: "Black" },
        { id: "gray", value: "Gray" },
        { id: "navy", value: "Navy" },
      ],
    },
  ],
  variants: [
    {
      id: "gid://shopify/ProductVariant/9876501",
      title: "Black / M",
      availableForSale: true,
      selectedOptions: [
        {
          name: "Color",
          value: "Black",
        },
        {
          name: "Size",
          value: "M",
        },
      ],
      price: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
    {
      id: "gid://shopify/ProductVariant/9876502",
      title: "Gray / L",
      availableForSale: false,
      selectedOptions: [
        {
          name: "Color",
          value: "Gray",
        },
        {
          name: "Size",
          value: "L",
        },
      ],
      price: {
        amount: "49.99",
        currencyCode: "USD",
      },
    },
  ],
  images: [
    {
      url: "https://i.pinimg.com/736x/6a/9c/98/6a9c9887c6aa5b43c0b804c6dcc23216.jpg",
      altText: "Black Hoodie",
      width: 800,
      height: 1000,
      isFeatured: true,
    },
    {
      url: "https://i.pinimg.com/236x/55/25/49/552549698d8fb909dd47ae4a0896245c.jpg",
      altText: "Gray Hoodie",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
    {
      url: "https://img.fantaskycdn.com/8a2dc25784dd27d1fe5d3688274c887b_540x.jpeg",
      altText: "Gray Hoodie",
      width: 800,
      height: 1000,
      isFeatured: false,
    },
  ],
  availableForSale: true,
  descriptionHtml: "<p>A super cozy unisex hoodie made from organic cotton.</p>",
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
  tags: ["hoodie", "unisex", "organic"],
  updatedAt: "2023-01-01T00:00:00Z",
};

export const ShirtCollection: ShopifyCollection = {
  handle: "shirts",
  title: "Shirts",
  description: "Shirts",
  seo: {
    title: "Shirts",
    description: "Shirts",
  },
  updatedAt: "2023-10-01T00:00:00Z",
}

export const HeadWearCollection: ShopifyCollection = {
  handle: "Headwear",
  title: "Headwear",
  description: "Headwear",
  seo: {
    title: "Headwear",
    description: "Headwear",
  },
  updatedAt: "2023-10-01T00:00:00Z",
}

export const mockCollections: ShopifyCollection[] = [
  {
    handle: "hoodies",
    title: "Hoodies",
    description: "A collection of cozy hoodies.",
    seo: {
      title: "Hoodies Collection",
      description: "Shop our range of comfortable hoodies.",
    },
    updatedAt: "2023-10-01T00:00:00Z",
  },
  {
    handle: "t-shirts",
    title: "T-Shirts",
    description: "A collection of stylish t-shirts.",
    seo: {
      title: "T-Shirts Collection",
      description: "Explore our trendy t-shirts.",
    },
    updatedAt: "2023-10-01T00:00:00Z",
  },
  ShirtCollection,
  HeadWearCollection,
];

export const products: Product[] = [mockProduct, mockProductHeadwear, mockProductShoes];