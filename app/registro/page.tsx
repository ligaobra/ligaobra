'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Registro() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (form.senha !== form.confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    const res = await fetch('/api/usuarios/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      }),
    });

    if (!res.ok) {
      const erro = await res.json();
      alert(erro.error || 'Erro ao cadastrar.');
      return;
    }

    alert('Cadastro realizado com sucesso!');
    router.push('/login');
  } catch (err) {
    console.error(err);
    alert('Erro no cadastro.');
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-2xl mb-4">Cadastro - LigaObra</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="nome"
          onChange={handleChange}
          placeholder="Seu nome"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Seu e-mail"
          className="w-full p-2 border rounded"
        />
        <input
          name="senha"
          type="password"
          onChange={handleChange}
          placeholder="Sua senha"
          className="w-full p-2 border rounded"
        />
        <input
          name="confirmarSenha"
          type="password"
          onChange={handleChange}
          placeholder="Confirme a senha"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
