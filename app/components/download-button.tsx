import { Button } from '@/components/ui/button';
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
    link.href = await toPng(target.current!, {
      quality: 0.95,
      pixelRatio: 2,
    });
    link.click();
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={downloadImage}
      className="rounded-full"
    >
      <Download size={20} />
      <span className="sr-only">ダウンロード</span>
    </Button>
  );
}
