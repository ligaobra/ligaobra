'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPrestador() {
  const [cnpj, setCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/prestador/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cnpj, senha }),
      });

      if (!res.ok) {
        toast.error('CNPJ ou senha inválidos');
        return;
      }

      toast.success('Login realizado com sucesso!');
      router.push('/painel/prestador');
    } catch (erro) {
  console.error(erro); // 
  toast.error('Erro ao fazer login');
}
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Login Prestador</h1>

      <input
        type="text"
        placeholder="CNPJ"
        className="w-full p-2 border mb-2"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        className="w-full p-2 border mb-4"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Entrar
      </button>
    </div>
  );
}
