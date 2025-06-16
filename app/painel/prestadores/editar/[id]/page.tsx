'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PainelWrapper from '../../../../../components/PainelWrapper';

interface Prestador {
  id: string;
  nome: string;
  tipoServico: string;
  segmento: string;
  site: string;
  instagram: string;
  whatsapp: string;
  cidade: string;
  estado: string;
}

export default function EditarPrestador() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState<Prestador>({
    id: '',
    nome: '',
    tipoServico: '',
    segmento: '',
    site: '',
    instagram: '',
    whatsapp: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    const fetchPrestador = async () => {
      const response = await fetch(`/api/prestadores/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      }
    };
    fetchPrestador();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/prestadores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    router.push('/painel/prestador');
  };

  return (
    <PainelWrapper>
      <h1 className="text-xl sm:text-2xl font-bold text-green-500 text-center mb-4">Editar Perfil - Prestador</h1>

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
          name="tipoServico"
          placeholder="Tipo de Serviço"
          value={formData.tipoServico}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
          required
        />

        <input
          type="text"
          name="segmento"
          placeholder="Segmento"
          value={formData.segmento}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
        />

        <input
          type="text"
          name="site"
          placeholder="Site"
          value={formData.site}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
        />

        <input
          type="text"
          name="instagram"
          placeholder="Instagram"
          value={formData.instagram}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp"
          value={formData.whatsapp}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
        />

        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm sm:text-base"
        />

        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={formData.estado}
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
          onClick={() => router.push('/painel/prestador')}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-3 sm:px-4 rounded w-full text-sm sm:text-base"
        >
          Voltar ao Painel
        </button>
      </form>
    </PainelWrapper>
  );
}
