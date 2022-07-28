import { useState } from 'react';
import { Dialog as DialogPrimitive } from '@headlessui/react';
import Button from './Button';

function Dialog({ defaultIsOpen = false, title = "Untitled", description = null, children }) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return (
    <DialogPrimitive open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-neutral-800/80 backdrop-blur flex flex-col items-center justify-center p-4">
        <DialogPrimitive.Panel className="w-[min(720px,_100%)] bg-black/80 p-4 rounded-lg shadow-sm flex flex-col items-stretch justify-start gap-4">
          <div className='flex items-end justify-between flex-wrap-reverse gap-2'>
            <div>
              <DialogPrimitive.Title className="text-2xl font-bold">{title}</DialogPrimitive.Title>
              {description ? <DialogPrimitive.Description className="text-neutral-500">
                {description}
              </DialogPrimitive.Description> : null}
            </div>
            <Button onClick={() => setIsOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {children}
        </DialogPrimitive.Panel>
      </div>
    </DialogPrimitive>
  );
}

export default Dialog;
