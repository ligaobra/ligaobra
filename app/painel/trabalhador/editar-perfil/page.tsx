'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PainelWrapper from '../../../../components/PainelWrapper';

interface Trabalhador {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  cidade: string;
  estado: string;
}

export default function EditarTrabalhador() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState<Trabalhador>({
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    const fetchTrabalhador = async () => {
      const response = await fetch(`/api/trabalhadores/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    };
    fetchTrabalhador();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/trabalhadores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/painel/trabalhador');
  };

  return (
    <PainelWrapper>
      <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-4">Editar Perfil - Trabalhador</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={formData.estado}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded w-full text-sm sm:text-base"
        >
          Salvar Alterações
        </button>

        <button
          type="button"
          onClick={() => router.push('/painel/trabalhador')}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-3 sm:px-4 rounded w-full text-sm sm:text-base"
        >
          Voltar ao Painel
        </button>
      </form>
    </PainelWrapper>
  );
}
