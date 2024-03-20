'use client';

import DownloadButton from '@/app/components/download-button';
import ElegantTree from '@/app/components/elegant-tree';
import { ModeToggle } from '@/app/components/mode-toggle';
import Toolbar from '@/app/components/toolbar';
import { cleanSrc, defaultPathes } from '@/lib/utils';
import {
  ChangeEventHandler,
  ClipboardEventHandler,
  useRef,
  useState,
} from 'react';

export default function Home() {
  const [input, setInput] = useState(defaultPathes.join('\n'));
  const ref = useRef<HTMLDivElement>(null);

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInput(e.target.value);
  };

  const onPaste: ClipboardEventHandler<HTMLTextAreaElement> = (e) => {
    const pastedData = e.clipboardData;
    const value = pastedData?.getData('text/plain');

    if (value.match(/node_modules|\.git|\.next/)) {
      e.preventDefault();
      const result = cleanSrc(value!);
      setInput(result);
    }
  };

  return (
    <div>
      <div className="flex h-screen">
        <textarea
          value={input}
          onPaste={onPaste}
          spellCheck={false}
          placeholder="find . | pbcopy"
          className="p-6 border-r text-sm text-muted-foreground bg-muted/30 resize-none focus:outline-none w-[400px]"
          onChange={handleInputChange}
        />
        <div className="p-6 flex items-center justify-center flex-1">
          <div className="m-atuo w-full max-w-[900px]">
            <div
              ref={ref}
              className="dark:bg-zinc-900 bg-zinc-50 ring-1 ring-border dark:text-gray-50 relative overflow-hidden shadow-lg"
            >
              <div className="px-10 py-10 aspect-video overflow-auto flex items-center justify-center">
                <div className="m-auto">
                  <ElegantTree src={input} />
                </div>
              </div>
              <span className="h-10 absolute inset-x-0 top-0 bg-gradient-to-b dark:from-zinc-900"></span>
              <span className="h-10 absolute inset-x-0 bottom-0 bg-gradient-to-t dark:from-zinc-900"></span>
            </div>

            <Toolbar>
              <DownloadButton target={ref} />
              <ModeToggle />
            </Toolbar>
          </div>
        </div>
      </div>
    </div>
  );
}
