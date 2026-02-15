"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";


const breakpointColumnsObj = {
  default: 4,
  1280: 4,
  1024: 3,
  768: 2,
  640: 1,
};

export default function MasonryGrid({ images }: { images?: string[] }) {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex gap-4"
      columnClassName="bg-clip-padding"
    >
      {images?.map((img,index) => (
        <div key={index} className="mb-4">
          <img
            src={img}
            alt=""
            className='w-full h-auto'
          />
        </div>
      ))}
    </Masonry>
  );
}
