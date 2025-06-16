'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Vaga {
  id: number;
  titulo: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial?: string;
  inicioPrevisto?: string;
}

export default function EditarVaga() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Vaga | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarVaga = async () => {
      try {
        const resposta = await fetch(`/api/vagas-publicadas/${id}`);
        if (!resposta.ok) {
          alert('Vaga não encontrada.');
          router.push('/painel-construtora');
          return;
        }
        const vaga = await resposta.json();
        setFormData(vaga);
      } catch (erro) {
        console.error('Erro ao carregar vaga:', erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarVaga();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`/api/vagas-publicadas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (resposta.ok) {
        alert('Vaga atualizada com sucesso!');
        router.push('/painel/vagas/listar');
      } else {
        alert('Erro ao atualizar vaga.');
      }
    } catch (erro) {
      console.error('Erro ao enviar dados:', erro);
      alert('Erro ao atualizar vaga.');
    }
  };

  if (carregando) return <p>Carregando dados da vaga...</p>;

  if (!formData) return <p>Vaga não encontrada.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Editar Vaga</h1>

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
              value={formData[field.name as keyof Vaga] || ''}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
            />
          </div>
        ))}

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Cadastrar
        </button>

        <button
        type="button"
        onClick={() => router.push('/')}
        className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-2"
        >
        Voltar para Home
        </button>

      </form>
    </div>
  );
}

