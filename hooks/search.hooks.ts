import { Search } from '@/interfaces';
import { fetchGifs } from '@/requests';
import { useQuery } from '@tanstack/react-query';

export const useSearch = (search: Search) =>
  useQuery({
    queryFn: async () => {
      const res = await fetchGifs(search);
      return res.data.map((gif) => ({
        originalUrl: gif.images.original.url,
        previewUrl: gif.images.preview.url,
      }));
    },
    queryKey: ['search', search.query, search.page],
  });
