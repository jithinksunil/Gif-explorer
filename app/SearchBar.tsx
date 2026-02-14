'use client';

import { useSearch } from '@/hooks';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { mutateAsync, isPending } = useSearch();
  const handleSearch = async (query: string) => {
    try {
      const response = await mutateAsync(query);
      setSearchResults(response);
    } catch (error) {}
  };
  useEffect(() => {
    if (query) {
      debounceTimeoutRef.current = setTimeout(() => {
        handleSearch(query);
      }, 100);
    }
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);
  return (
    <div className='h-screen '>
      <input type='text' onChange={(e) => setQuery(e.target.value)} />
      <div className='grid grid-cols-4'>
        {searchResults.map((result, index) => (
          <Image
            key={index}
            src={result.images.original.url}
            alt='gif'
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
};
