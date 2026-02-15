'use client';

import { Modal } from '@/components/common';
import MasonryGrid from '@/components/common/MasonryGrid';
import { useSearch } from '@/hooks';
import { Search } from '@/interfaces';
import { pageLimit } from '@/lib';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Masonry from 'react-masonry-css';
const breakpointColumnsObj = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  640: 1,
};
export const View = () => {
  const [search, setSearch] = useState<Search>({ query: '', page: 1 });
  const { data, isLoading } = useSearch(search);
  const [paginatedGifs, setPaginatedGifs] = useState<{
    gifs: string[];
    hasNext: boolean;
  }>({ gifs: [], hasNext: false });
  const [query, setQuery] = useState('');
  const deBouncerRef = useRef<NodeJS.Timeout | null>(null);
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
          gifs: data.map((gif) => gif.originalUrl),
          hasNext: data.length == pageLimit,
        });
      } else {
        setPaginatedGifs((pre) => ({
          gifs: [...pre.gifs, ...data.map((gif) => gif.originalUrl)],
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
      <div className='max-w-[1440px] mx-auto py-8 px-4 '>
        <InfiniteScroll
          loader={<div />}
          dataLength={paginatedGifs.gifs.length}
          hasMore={paginatedGifs.hasNext}
          next={() => {
            setSearch((pre) => ({ ...pre, page: pre.page + 1 }));
          }}
          endMessage={
            !isLoading &&
            paginatedGifs.gifs.length ? (
              <p className='text-center'>Reached dead end</p>
            ):null
          }
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className='flex gap-4'
            columnClassName='bg-clip-padding'
          >
            {paginatedGifs.gifs.map((gif, index) => (
              <Modal key={index} imageUrl={gif}>
                <div
                  key={index}
                  className='mb-4 hover:cursor-pointer hover:scale-102 duration-100'
                >
                  <img src={gif} alt='' className='w-full h-auto rounded-lg' />
                </div>
              </Modal>
            ))}
            {isLoading
              ? [...Array(4)].map((_, index) => (
                  <div
                    key={`loader-${index}`}
                    className='mb-4 w-full h-[300px] bg-muted-foreground animate-pulse rounded-lg'
                  />
                ))
              : null}
          </Masonry>
          {!isLoading && !paginatedGifs.gifs.length ? (
            <p className='text-center w-full'>No Gifs found</p>
          ) : null}
        </InfiniteScroll>
        {/* <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 py-4 space-y-4'>
          {isLoading
            ? [...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className='w-full h-[300px] bg-muted-foreground animate-pulse rounded-lg'
                />
              ))
            : data?.map(({ originalUrl, previewUrl }, index) => (
                <Modal key={index} imageUrl={originalUrl}>
                  <img
                    src={originalUrl}
                    alt={`img-${index}`}
                    className='w-full h-auto rounded-lg object-cover break-inside-avoid hover:cursor-pointer hover:scale-102 duration-100'
                  />
                </Modal>
              ))}
        </div> */}
      </div>
    </>
  );
};
