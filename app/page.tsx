import { Suspense } from 'react';
import { View } from './View';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <View />
    </Suspense>
  );
}
