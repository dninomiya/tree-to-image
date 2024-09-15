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
  const children = item.children.filter((child) => child.name);
  const [name, comment] = item.name.split(' # ');

  return (
    <li className="relative px-4 dark:text-zinc-300 text-zinc-500">
      <button
        className="absolute inset-0"
        onClick={() => setHiglight((v) => !v)}
      ></button>
      {highlight && (
        <span className="pointer-events-none absolute block -inset-1 border-2 border-pink-500 rounded-lg"></span>
      )}
      <div className="flex items-center gap-3 py-2">
        {isFolder ? (
          <Folder size={16} className="text-muted-foreground" />
        ) : (
          <File size={16} className="text-muted-foreground" />
        )}
        {name}
        {comment && (
          <span className="font-normal text-sm text-muted-foreground/70 -ml-[6px]">
            - {comment}
          </span>
        )}
      </div>

      {children.length > 0 && (
        <ul className="pl-4">
          {children.map((child, i) => (
            <Item key={`${name}-child-${i}`} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};
