'use client';

import dynamic from 'next/dynamic';

const Chat = dynamic(() => import('@/components/Demo'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Chat />
    </main>
  );
}
