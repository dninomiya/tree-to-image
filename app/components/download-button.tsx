import { toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import React, { RefObject } from 'react';

export default function DownloadButton({
  target,
}: {
  target: RefObject<HTMLDivElement>;
}) {
  const downloadImage = async () => {
    const link = document.createElement('a');
    link.download = 'my-image-name.png';
    link.href = await toPng(target.current!, { quality: 0.95, pixelRatio: 10 });
    link.click();
  };

  return (
    <button
      onClick={downloadImage}
      className="bg-zinc-900 mx-auto mt-4 w-10 h-10 grid place-content-center rounded-full shadow-lg text-zinc-400"
    >
      <Download size={20} />
      <span className="sr-only">ダウンロード</span>
    </button>
  );
}
