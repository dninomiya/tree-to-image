'use client';

import { defaultPathes } from '@/lib/utils';
import { toPng } from 'html-to-image';
import { Download, File, Folder } from 'lucide-react';
import {
  ChangeEventHandler,
  ClipboardEventHandler,
  useRef,
  useState,
} from 'react';

export default function Home() {
  const [input, setInput] = useState(defaultPathes.join('\n'));
  const ref = useRef<HTMLDivElement>(null);
  const dataUrl = useRef<string>();
  const [image, setImage] = useState<string>();

  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setInput(e.target.value);
  };

  const generate = async () => {
    dataUrl.current = await toPng(ref.current!, { quality: 0.95 });
    setImage(dataUrl.current);

    const link = document.createElement('a');
    link.download = 'my-image-name.png';
    link.href = dataUrl.current;
    link.click();
  };

  const onPaste: ClipboardEventHandler<HTMLTextAreaElement> = (e) => {
    const pastedData = e.clipboardData;
    const value = pastedData?.getData('text/plain');

    if (value.match(/node_modules|\.git|\.next/)) {
      e.preventDefault();
      const result = treeToYAML(value!);
      setInput(result);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-3 h-screen">
        <textarea
          value={input}
          onPaste={onPaste}
          spellCheck={false}
          className="p-6 bg-zinc-950 text-zinc-700 resize-none focus:outline-none"
          onChange={handleInputChange}
        />
        <div className="bg-zinc-800 p-6 flex items-center justify-center col-span-2">
          <div className="m-atuo w-full">
            <div
              ref={ref}
              className="bg-zinc-900 text-gray-50 relative rounded-md overflow-hidden shadow-lg"
            >
              <div className="px-10 py-10 aspect-video overflow-auto flex items-center justify-center">
                <div className="m-auto">
                  <TreeRender src={input} />
                </div>
              </div>
              <span className="h-10 absolute inset-x-0 top-0 bg-gradient-to-b from-zinc-900"></span>
              <span className="h-10 absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-900"></span>
            </div>

            <button
              onClick={generate}
              className="bg-zinc-900 mx-auto mt-4 w-10 h-10 grid place-content-center rounded-full shadow-lg text-zinc-400"
            >
              <Download size={20} />
              <span className="sr-only">ダウンロード</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function treeToYAML(src: string) {
  const lines = src.split('\n');
  return lines
    .filter((line) => !line.match(/node_modules|\.git|\.next/))
    .filter((line) => line !== '.')
    .map((line) => line.replace('./', ''))
    .join('\n');
}

const TreeRender = ({ src }: { src: string }) => {
  const tree = buildTree(src);

  return (
    <ul>
      {tree.map((item, i) => {
        return <Item key={item.name + i} item={item} />;
      })}
    </ul>
  );
};

type Item = {
  name: string;
  children: Item[];
};

const Item = ({ item }: { item: Item }) => {
  const [highlight, setHiglight] = useState(false);
  const isFolder = item.children.length > 0;

  return (
    <li className="relative px-4 text-zinc-300">
      <button
        className="absolute inset-0"
        onClick={() => setHiglight((v) => !v)}
      ></button>
      {highlight && (
        <span className="pointer-events-none absolute block -inset-1 border-2 border-pink-500 rounded-lg"></span>
      )}
      <div className="flex items-center py-2">
        {isFolder ? (
          <Folder size={16} className="mr-3 text-zinc-500" />
        ) : (
          <File size={16} className="mr-3 text-zinc-500" />
        )}
        {item.name}
      </div>

      {isFolder && (
        <ul className="pl-4">
          {item.children.map((child, i) => (
            <Item key={`${item.name}-child-${i}`} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

function buildTree(src: string) {
  const paths = src.split('\n');
  const root: Item[] = [];

  paths.forEach((path) => {
    const parts = path.split('/').filter((part) => part.length > 0);

    let currentLevel = root;
    parts.forEach((part) => {
      let existingPath = currentLevel.find((p) => p.name === part);

      if (!existingPath) {
        existingPath = {
          name: part,
          children: [],
        };
        currentLevel.push(existingPath);
      }

      currentLevel = existingPath.children;
    });
  });

  return root;
}
