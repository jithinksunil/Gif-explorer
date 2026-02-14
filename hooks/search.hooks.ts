import { search } from '@/requests';
import { useMutation } from '@tanstack/react-query';

export const useSearch = () =>
  useMutation({
    mutationFn: async (query: string) => {
      const res = await search(query);
      return res.data;
    },
  });
