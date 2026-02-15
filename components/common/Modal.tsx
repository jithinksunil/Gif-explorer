'use client';

import { GifObject } from '@/interfaces';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { GifPlayer } from '../view';

interface PropsType {
  gif: GifObject;
  children: ReactNode;
}

export function Modal({ gif, children }: PropsType) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/70 z-50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 z-50  -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-3xl overflow-hidden outline-none focus:outline-none '>
          <GifPlayer
            gif={gif}
            className='min-w-[320px] rounded-[16px]'
            style={{ width: gif.originalWidth }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
