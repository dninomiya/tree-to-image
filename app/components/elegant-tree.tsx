'use client';

import { getTreeData } from '@/lib/utils';
import { ItemData } from '@/types/item';
import { File, Folder } from 'lucide-react';
import React, { useState } from 'react';

export default function ElegantTree({ src }: { src: string }) {
  const tree = getTreeData(src);

  return (
    <ul>
      {tree.map((item, i) => {
        return <Item key={item.name + i} item={item} />;
      })}
    </ul>
  );
}

const Item = ({ item }: { item: ItemData }) => {
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
