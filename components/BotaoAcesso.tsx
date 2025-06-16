'use client';

import { useRouter } from 'next/navigation';

interface BotaoAcessoProps {
  tipo: string;
  cor: string;
  titulo: string;
  subtitulo: string;
}

export default function BotaoAcesso({ tipo, cor, titulo, subtitulo }: BotaoAcessoProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/login?tipo=${tipo}`)}
      className={`w-full ${cor} text-white py-3 rounded-lg shadow hover:opacity-90 transition`}
    >
      {titulo}
      <p className="text-sm">{subtitulo}</p>
    </button>
  );
}

