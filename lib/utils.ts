import { ItemData } from '@/types/item';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultPathes = [
  'app/favicon.ico',
  'app/layout.tsx',
  'app/page.tsx',
  'app/globals.css',
  'bun.lockb',
  'next.config.js',
  'next-env.d.ts',
  'README.md',
  'tailwind.config.ts',
  'components',
  'components/ui',
  'components/ui/button.tsx',
  'public/vercel.svg',
  'public/next.svg',
  'package.json',
  'lib/utils.ts',
  'components.json',
  'tsconfig.json',
  'postcss.config.js',
  '.eslintrc.json',
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
};

export const cleanSrc = (src: string) => {
  const lines = src.split('\n');
  return lines
    .filter((line) => !line.match(/node_modules|\.git|\.next/))
    .filter((line) => line !== '.')
    .map((line) => line.replace('./', ''))
    .join('\n');
};
