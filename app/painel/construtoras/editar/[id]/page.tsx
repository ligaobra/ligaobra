'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PainelWrapper from '../../../../../components/PainelWrapper';

interface Construtora {
  id: string;
  nomeEmpresa: string;
  cnpj: string;
  cidade: string;
  estado: string;
}

export default function EditarConstrutora() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState<Construtora>({
    id: '',
    nomeEmpresa: '',
    cnpj: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    const fetchConstrutora = async () => {
      const response = await fetch(`/api/construtoras/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    };
    fetchConstrutora();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/construtoras/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/painel/construtora');
  };

  return (
    <PainelWrapper>
      <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-4">Editar Perfil - Construtora</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nomeEmpresa"
          placeholder="Nome da Empresa"
          value={formData.nomeEmpresa}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
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
          onClick={() => router.push('/painel/construtora')}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-3 sm:px-4 rounded w-full text-sm sm:text-base"
        >
          Voltar ao Painel
        </button>
      </form>
    </PainelWrapper>
  );
}
