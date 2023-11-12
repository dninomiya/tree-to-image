import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const defaultPathes = [
  'app',
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
  'public',
  'public/vercel.svg',
  'public/next.svg',
  'package.json',
  'lib',
  'lib/utils.ts',
  'components.json',
  'tsconfig.json',
  'postcss.config.js',
  '.eslintrc.json',
];
