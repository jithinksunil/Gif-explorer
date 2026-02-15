import { GifObject, Search } from '@/interfaces';
import { fetchGifs } from '@/requests';
import { useQuery } from '@tanstack/react-query';

export const useSearch = (search: Search) =>
  useQuery({
    queryFn: async ():Promise<GifObject[]> => {
      const res = await fetchGifs(search);
      return res.data.map((gif) => ({
        originalUrl: gif.images.original.url,
        previewUrl: gif.images.downsized.url,
        id: gif.id as unknown as string,
        title: gif.title,
        originalHeight:gif.images.original.height,
        originalWidth:gif.images.original.width,
        mp4Url:gif.images.downsized_small.mp4
      }));
    },
    queryKey: ['search', search.query, search.page],
  });
