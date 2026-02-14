import { Suspense } from 'react';
import { SearchBar } from './SearchBar';

export default function Home() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>
    </div>
  );
}
