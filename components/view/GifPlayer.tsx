import { GifObject } from '@/interfaces';
import React, { useState } from 'react';
interface PropsType {
  gif: GifObject;
  className?: string;
  style?: React.CSSProperties
}
export const GifPlayer = ({ className, gif ,style}: PropsType) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <video
      onCanPlayThrough={() => setIsLoading(false)}
      autoPlay
      loop
      muted
      playsInline
      className={`${isLoading ? 'animate-pulse bg-muted-foreground' : ''} ${className}`}
      style={{
        aspectRatio: gif.originalWidth / gif.originalHeight,
        ...style
      }}
    >
      <source src={gif.mp4Url} type='video/mp4' />
    </video>
  );
};
