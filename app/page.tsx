'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
return (
  <div
    className="min-h-screen bg-cover bg-center flex flex-col items-start justify-start px-4 py-8"
   style={{ backgroundImage: "url('/images/fundo.png')" }}
  >
    {/* Logomarca */}
    <div className="flex items-center space-x-4 mb-6 ml-4">
      <Image src="/images/logo.png" alt="Logo LigaObra" width={80} height={80} />
      <span className="text-green-600 font-bold text-3xl">LigaObra</span>
    </div>

    {/* Painel Cinza */}
    <div className="bg-gray-800 bg-opacity-80 p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto space-y-4 text-center">
      <button onClick={() => router.push('/painel/trabalhador')} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded">Sou Trabalhador</button>
      <button onClick={() => router.push('/painel/construtora')} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded">Sou Construtora</button>
      <button onClick={() => router.push('/painel/prestador')} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded">Sou Prestador de Serviços</button>
      <button onClick={() => router.push('/sou-visitante')} className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded">Sou Visitante</button>
      <button onClick={() => router.push('/vagas')} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded">Ver Vagas Públicas</button>
    </div>

    {/* Rodapé */}
    <footer className="mt-8 text-center text-gray-400 text-xs sm:text-sm md:text-base px-2 w-full">
      © {new Date().getFullYear()} LigaObra. Todos os direitos reservados.
    </footer>
  </div>
);
}
