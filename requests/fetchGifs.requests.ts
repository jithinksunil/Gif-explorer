import { Search } from '@/interfaces';
import { pageLimit } from '@/lib';
import { GiphyFetch } from '@giphy/js-fetch-api';

export const fetchGifs = (search: Search) => {
  const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIFY_API_KEY!);
  return gf.search(search.query, {
    limit: pageLimit,
    rating: 'g',
    offset: (search.page - 1) * pageLimit,
  });
};
