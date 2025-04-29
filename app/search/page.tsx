import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { products } from 'lib/mock';
// import { getProducts } from 'lib/shopify';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const handleSearch = (value: string | undefined ) => {
    // Handle search logic here, e.g., update state or make an API call
    console.log('Search value:', value);
    return products.filter((product) => product.title.toLowerCase().includes((value ?? '').toLowerCase()));
  }

  const product = handleSearch(searchValue); // Mock data for testing
  const resultsText = product.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {product.length === 0
            ? 'There are no products that match '
            : `Showing ${product.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {product.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={product} />
        </Grid>
      ) : null}
    </>
  );
}
