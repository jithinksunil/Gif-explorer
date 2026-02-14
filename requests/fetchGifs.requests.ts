import { Search } from '@/interfaces';
import { GiphyFetch } from '@giphy/js-fetch-api';

export const fetchGifs = (search: Search) => {
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIFY_API_KEY!);
  return gf.search(search.query, {
    limit: 100,
    rating: 'g',
    offset: (search.page - 1) * 10,
  });
};
