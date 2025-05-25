import { TAGS } from "lib/constants";
import { Collection, Product } from "lib/shopify/types";
import {
    unstable_cacheLife as cacheLife,
    unstable_cacheTag as cacheTag
} from 'next/cache';

export const getAllCollections = async () => {
    console.log("Fetching collections from API");
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
        
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await res.json();
        
        if (!data) {
            throw new Error("No data found");
        }

        return data.collections;

    } catch (error) {
        console.error("Error fetching collections:", error);
        return [];
    }
};

export const getCollectionById = async (id: string): Promise<Collection | null> => {
    console.log("Fetching collection by ID:", id);
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/collection?id=${id}`);
        
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await res.json();
        
        if (!data.collection) {
            throw new Error("Collection not found");
        }
        
        return data.collection;

    } catch (error) {
        console.error("Error fetching collection by ID:", error);
        return null;
    }
}

export const getCollection = async (collection: string): Promise<Collection | null> => {
    console.log("Fetching collection:", collection);
    const collections = await getAllCollections();
    console.log("Available collections:", collections);
    const collectionHandle = collections.find(
        (c: Collection) => c.title === collection
    );
    console.log("Found collection handle:", collectionHandle);
    return collectionHandle || null;
}


export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {

  'use cache';
  cacheTag(TAGS.collections, TAGS.products);
  cacheLife('days');

  console.log('Fetching collection products...');

  const collections = await getAllCollections();

  console.log('collections', collections);

  const collectionHandle = collections.find(
    (c: Collection) => c.title === collection
  );

  console.log('collectionHandle', collectionHandle);

  return collectionHandle?.product || [];
}