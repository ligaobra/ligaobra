'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  titulo: string;
}

export default function CabecalhoPainel({ titulo }: Props) {
  const router = useRouter();

  const sair = () => {
    localStorage.removeItem('tipoUsuario');
    router.push('/');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">{titulo}</h1>
      <button
        onClick={sair}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </div>
  );
}

