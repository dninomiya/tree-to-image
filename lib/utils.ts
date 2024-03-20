import { ItemData } from '@/types/item';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultPathes = [
  'app/favicon.ico',
  'blank-directory/',
  'public # comment/vercel.svg',
  'public # comment/next.svg # file comment',
];

export const getTreeData = (src: string) => {
  const paths = src.split('\n');
  const root: ItemData[] = [];

  paths.forEach((path) => {
    if (!path) {
      return;
    }

    const parts = path.split('/');

    let currentLevel = root;
    parts.forEach((part) => {
      let existingPath = currentLevel.find(
        (p) => p.name.split(' # ')[0] === part
      );

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
};

export const cleanSrc = (src: string) => {
  const lines = src.split('\n');
  return lines
    .filter((line) => !line.match(/node_modules|\.git|\.next/))
    .filter((line) => line !== '.')
    .map((line) => line.replace('./', ''))
    .join('\n');
};
