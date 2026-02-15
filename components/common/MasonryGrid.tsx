'use client';

import React, { ReactNode } from 'react';
import Masonry from 'react-masonry-css';
const breakpointColumnsObj = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  640: 1,
};
interface PropsType{
  children:ReactNode
}
export const MasonryGrid = ({children}:PropsType) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className='flex gap-4'
      columnClassName='bg-clip-padding'
    >{children}</Masonry>
  );
};
