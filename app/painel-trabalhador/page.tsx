'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PainelTrabalhador() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen backdrop-blur-sm"
      style={{
        backgroundImage: "url('/images/fundo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center space-x-2 mt-4 ml-4">
        <Image src="/images/logo.png" alt="Logo LigaObra" width={100} height={100} />
        <span className="text-green-600 font-bold text-xl">LigaObra</span>
      </div>

      <div className="panel">
        <h1 className="text-2xl font-bold">Painel do Trabalhador</h1>

        <button onClick={() => router.push('/vagas')} className="button-principal">
          Ver Vagas
        </button>

        <button onClick={() => router.back()} className="button-retorno">Voltar</button>
      </div>
    </div>
  );
}



