'use client';

import { GifObject } from '@/interfaces';
import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

type ModalProps = {
  gif: GifObject;
  children: ReactNode;
};

export function Modal({ gif, children }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/70 z-50' />
        <Dialog.Content className='fixed left-1/2 top-1/2 z-50 max-h-[80vh]  -translate-x-1/2 -translate-y-1/2 bg-background p-6 rounded-3xl overflow-hidden outline-none focus:outline-none'>
          <img
            src={gif.originalUrl}
            alt={gif.title}
            className='rounded-[16px] h-full'
            style={{ aspectRatio: gif.originalWidth / gif.originalHeight }}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
