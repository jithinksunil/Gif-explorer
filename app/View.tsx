'use client';

import { MasonryGrid, Modal } from '@/components/common';
import { useSearch } from '@/hooks';
import { GifObject, Search } from '@/interfaces';
import { pageLimit } from '@/lib';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const View = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState<Search>({ query: '', page: 1 });
  const [paginatedGifs, setPaginatedGifs] = useState<{
    gifs: GifObject[];
    hasNext: boolean;
  }>({ gifs: [], hasNext: false });
  const deBouncerRef = useRef<NodeJS.Timeout | null>(null);
  const { data, isLoading } = useSearch(search);

  useEffect(() => {
    deBouncerRef.current = setTimeout(() => {
      setSearch((prev) => ({ ...prev, query }));
    }, 1000);
    return () => {
      if (deBouncerRef.current) {
        clearTimeout(deBouncerRef.current);
      }
    };
  }, [query]);

  useEffect(() => {
    if (data) {
      if (search.page == 1) {
        setPaginatedGifs({
          gifs: data,
          hasNext: data.length == pageLimit,
        });
      } else {
        setPaginatedGifs((pre) => ({
          gifs: [...pre.gifs, ...data],
          hasNext: data.length == pageLimit,
        }));
      }
    }
  }, [data]);

  return (
    <>
      <div className='border-b border-muted-foreground sticky top-0 z-50'>
        <div className='max-w-[1440px] mx-auto flex justify-center py-4 bg-background px-4 '>
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
        <InfiniteScroll
          loader={<div />}
          dataLength={paginatedGifs.gifs.length}
          hasMore={paginatedGifs.hasNext}
          next={() => {
            setSearch((pre) => ({ ...pre, page: pre.page + 1 }));
          }}
          endMessage={
            !isLoading && paginatedGifs.gifs.length ? (
              <p className='text-center'>Reached dead end</p>
            ) : null
          }
        >
          <MasonryGrid>
            {paginatedGifs.gifs.map((gif, index) => (
              <Modal key={index} gif={gif}>
                <div
                  key={gif.id}
                  className='mb-4 hover:cursor-pointer hover:scale-102 duration-100 bg-muted-foreground rounded-lg'
                >
                  <img
                    src={gif.previewUrl}
                    alt={gif.title}
                    className='w-full rounded-lg'
                    style={{aspectRatio:gif.originalWidth/gif.originalHeight}}
                  />
                  <p className='text-center'>{gif.title}</p>
                </div>
              </Modal>
            ))}
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  <div
                    key={`loader-${index}`}
                    className='mb-4 h-[300px] bg-muted-foreground animate-pulse rounded-lg'
                  />
                ))
              : null}
          </MasonryGrid>

          {!isLoading && !paginatedGifs.gifs.length ? (
            <p className='text-center w-full'>No Gifs found</p>
          ) : null}
        </InfiniteScroll>
      </div>
    </>
  );
};
