'use client';

import { useSearch } from '@/hooks';
import { Search } from '@/interfaces';
import { useEffect, useRef, useState } from 'react';

export const View = () => {
  const [search, setSearch] = useState<Search>({ query: '', page: 1 });
  const { data, isLoading } = useSearch(search);
  const [query, setQuery] = useState('');
  const deBouncerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    deBouncerRef.current = setTimeout(() => {
      setSearch((prev) => ({ ...prev, query }));
    }, 500);
    return () => {
      if (deBouncerRef.current) {
        clearTimeout(deBouncerRef.current);
      }
    };
  }, [query]);

  return (
    <>
      <div className='border-b border-muted-foreground sticky top-0'>
        <div className='max-w-[1440px] mx-auto flex justify-center py-4 bg-background'>
          <input
            type='text'
            className='bg-muted-foreground rounded-md w-[600px] py-2 px-4 focus:outline-none'
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder='Search GIFs...'
          />
        </div>
      </div>
      <div className='max-w-[1440px] mx-auto'>
        <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 py-4 space-y-4'>
          {isLoading
            ? [...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className='w-full h-[300px] bg-muted-foreground animate-pulse rounded-lg'
                />
              ))
            : data?.map(({ originalUrl, previewUrl }, index) => (
                <img
                  key={index}
                  src={originalUrl}
                  alt={`img-${index}`}
                  className='w-full h-auto rounded-lg object-cover break-inside-avoid'
                />
              ))}
        </div>
      </div>
    </>
  );
};
