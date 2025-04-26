// import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { mockProduct } from 'lib/mock';
import { ShopifyCollection } from 'lib/shopify/types';

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  // const collection = await getCollection(params.collection);
  const collection: ShopifyCollection = {
      handle: "shirts",
      title: "Shirts",
      description: "Shirts",
      seo: {
        title: "Shirts",
        description: "Shirts",
      },
      updatedAt: "2023-10-01T00:00:00Z",
    }

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  // const products = await getCollectionProducts({ collection: params.collection, sortKey, reverse });
  const products = [mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct, mockProduct]; // Mock data for testing
  
  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
