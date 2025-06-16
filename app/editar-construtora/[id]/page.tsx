'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function EditarConstrutora() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: '',
    nomeEmpresa: '',
    tipoServico: '',
    cidade: '',
    estado: '',
    site: '',
    instagram: '',
    whatsapp: '',
  });

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('construtora');
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      if (dados.id === id) {
        setFormData(dados);
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const salvarAlteracoes = () => {
    localStorage.setItem('construtora', JSON.stringify(formData));
    toast.success('Perfil atualizado com sucesso!');
    router.push('/painel-construtora');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Editar Construtora</h1>

      {Object.entries(formData).map(([key, value]) => (
        key !== 'id' && (
          <div key={key} className="mb-4">
            <label className="block mb-1 font-semibold capitalize">{key}:</label>
            <input
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              type="text"
            />
          </div>
        )
      ))}

      <div className="flex justify-between">
        <button
          onClick={() => router.push('/painel-construtora')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Voltar
        </button>
        <button
          onClick={salvarAlteracoes}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
