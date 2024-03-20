import Image from 'next/image';
import React from 'react';

export default function AuthorLink() {
  return (
    <div className="p-3 rounded-xl border flex items-center gap-3 fixed bottom-4 right-4 bg-muted/30 text-muted-foreground">
      <Image
        src="https://avatars.githubusercontent.com/u/5842851"
        className="rounded-full"
        width={24}
        height={24}
        unoptimized
        alt=""
      />
      <a href="http://twitter.com/d151005" target="_blank" className="text-sm">
        nino
        <span className="absolute inset-0"></span>
      </a>
    </div>
  );
}
