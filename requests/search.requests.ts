import { GiphyFetch } from '@giphy/js-fetch-api';

export const search = (query: string) => {
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIFY_API_KEY!);
  return gf.search(query, {
    limit: 10,
    rating: 'g',
  });
};
