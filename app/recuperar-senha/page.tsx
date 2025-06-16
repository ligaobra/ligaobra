'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RecuperarSenha() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Se o email ${email} estiver cadastrado, enviaremos instruções.`);
    router.push('/login');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-start justify-start px-4 py-8"
      style={{ backgroundImage: "url('/images/obra-fundo.jpg')" }}
    >
      {/* Logomarca */}
      <div className="flex items-center space-x-4 mb-6 ml-4">
        <Image src="/images/logo.png" alt="Logo LigaObra" width={60} height={60} className="sm:w-20 sm:h-20" />
        <span className="text-green-600 font-bold text-2xl sm:text-3xl">LigaObra</span>
      </div>

      {/* Painel */}
      <div className="bg-gray-800 bg-opacity-80 p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-4">Recuperar Senha</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Seu email cadastrado"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
            required
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded w-full text-sm sm:text-base"
          >
            Recuperar Senha
          </button>
        </form>

        <button
          onClick={() => router.push('/login')}
          className="mt-4 text-green-500 hover:underline w-full text-center text-sm sm:text-base"
        >
          Voltar para Login
        </button>
      </div>
    </div>
  );
}
