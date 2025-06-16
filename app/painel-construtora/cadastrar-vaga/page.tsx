'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastrarVaga() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    cidade: '',
    estado: '',
    tipoContrato: '',
    faixaSalarial: '',
    inicioPrevisto: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const resposta = await fetch('/api/vagas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (resposta.ok) {
      alert('Vaga cadastrada com sucesso!');
      router.push('/painel-construtora');
    } else {
      alert('Erro ao cadastrar vaga.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Cadastrar Nova Vaga</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-2xl shadow-md">
        {[
          { label: 'Título da Vaga', name: 'titulo' },
          { label: 'Cidade', name: 'cidade' },
          { label: 'Estado', name: 'estado' },
          { label: 'Tipo de Contrato', name: 'tipoContrato' },
          { label: 'Faixa Salarial', name: 'faixaSalarial' },
          { label: 'Início Previsto', name: 'inicioPrevisto' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        >
          Publicar Vaga
        </button>
      </form>
    </div>
  );
}
