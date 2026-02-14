import { Suspense } from 'react';
import { View } from './View';

export default function Home() {
  return (
    <div >
      <Suspense fallback={<div>Loading...</div>}>
        <View />
      </Suspense>
    </div>
  );
}
