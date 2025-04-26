import OpengraphImage from 'components/opengraph-image';
import { ShirtCollection } from 'lib/mock';
// import { getCollection } from 'lib/shopify';


export default async function Image({
  params
}: {
  params: { collection: string };
}) {
  const collection = ShirtCollection; // Mock data for testing
  // await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
