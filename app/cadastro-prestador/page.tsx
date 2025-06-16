'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PainelWrapper from '../../components/PainelWrapper';

export default function CadastroPrestador() {
  const router = useRouter();

  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [segmento, setSegmento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [site, setSite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoPrestador = {
      nomeEmpresa,
      tipoServico,
      segmento,
      cidade,
      estado,
      site,
      instagram,
      whatsapp,
    };

    try {
      const response = await fetch('/api/cadastrar-prestador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPrestador),
      });

      if (response.ok) {
        alert('Prestador cadastrado com sucesso!');
        router.push('/');
      } else {
        alert('Erro ao cadastrar o prestador.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar.');
    }
  };

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Cadastro de Prestador</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nome da Empresa"
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Tipo de Serviço"
          value={tipoServico}
          onChange={(e) => setTipoServico(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Segmento"
          value={segmento}
          onChange={(e) => setSegmento(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Site"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <input
          type="text"
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Cadastrar Prestador
        </button>

      </form>
    </PainelWrapper>
  );
}
