'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PainelWrapper from '../../../../../components/PainelWrapper';

interface Vaga {
  id: string;
  titulo: string;
  descricao: string;
  cidade: string;
  estado: string;
  salario: string;
}

export default function EditarVaga() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState<Vaga>({
    id: '',
    titulo: '',
    descricao: '',
    cidade: '',
    estado: '',
    salario: '',
  });

  useEffect(() => {
    const fetchVaga = async () => {
      const response = await fetch(`/api/vagas-publicadas/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    };
    fetchVaga();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/vagas-publicadas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/painel/vagas');
  };

  return (
    <PainelWrapper>
      <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-4">Editar Vaga</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titulo"
          placeholder="Título da Vaga"
          value={formData.titulo}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        />

        <textarea
          name="descricao"
          placeholder="Descrição"
          value={formData.descricao}
          onChange={handleChange}
          rows={4}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        ></textarea>

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

        <input
          type="text"
          name="salario"
          placeholder="Salário"
          value={formData.salario}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 sm:px-4 rounded w-full text-sm sm:text-base"
        >
          Salvar Alterações
        </button>

        <button
          type="button"
          onClick={() => router.push('/painel/vagas')}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-3 sm:px-4 rounded w-full text-sm sm:text-base"
        >
          Voltar ao Painel de Vagas
        </button>
      </form>
    </PainelWrapper>
  );
}
