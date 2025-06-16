'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PainelWrapper from '../../../components/PainelWrapper';

interface Prestador {
  id: string;
  nomeEmpresa: string;
  tipoServico: string;
  segmento: string;
  cidade: string;
  estado: string;
  site: string;
  instagram: string;
  whatsapp: string;
}

export default function EditarPrestador() {
  const router = useRouter();
  const [prestador, setPrestador] = useState<Prestador | null>(null);

  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [segmento, setSegmento] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [site, setSite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    const fetchPrestador = async () => {
      try {
        const response = await fetch('/api/prestador-logado');
        if (response.ok) {
          const data: Prestador = await response.json();
          setPrestador(data);
          setNomeEmpresa(data.nomeEmpresa);
          setTipoServico(data.tipoServico);
          setSegmento(data.segmento);
          setCidade(data.cidade);
          setEstado(data.estado);
          setSite(data.site);
          setInstagram(data.instagram);
          setWhatsapp(data.whatsapp);
        } else {
          console.error('Erro ao buscar dados:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao buscar prestador:', error);
      }
    };

    fetchPrestador();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const prestadorAtualizado: Prestador = {
      id: prestador?.id || '',
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
      const response = await fetch('/api/prestador-logado', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prestadorAtualizado),
      });

      if (response.ok) {
        alert('Dados atualizados com sucesso!');
        router.push('/painel/prestador');
      } else {
        alert('Erro ao atualizar o prestador.');
      }
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('Erro ao tentar atualizar os dados.');
    }
  };

  return (
    <PainelWrapper>
      <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Editar Perfil do Prestador</h1>
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
          Salvar Alterações
        </button>

      </form>
    </PainelWrapper>
  );
}
