import React from 'react';

export default function Toolbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="shadow-lg w-fit mt-6 mx-auto border gap-2 rounded-full flex items-center p-2">
      {children}
    </div>
  );
}
