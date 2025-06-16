'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';


export default function EditarPrestador() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [nome, setNome] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [segmento, setSegmento] = useState('');
  const [site, setSite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    const fetchPrestador = async () => {
      const response = await fetch(`/api/prestador/${id}`);
      const data = await response.json();
      setNome(data.nome);
      setTipoServico(data.tipoServico);
      setSegmento(data.segmento);
      setSite(data.site);
      setInstagram(data.instagram);
      setWhatsapp(data.whatsapp);
    };

  

    fetchPrestador();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/prestador/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          tipoServico,
          segmento,
          site,
          instagram,
          whatsapp
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar prestador');
      }

      alert('Prestador atualizado com sucesso!');
      router.push('/painel-prestador');

    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar prestador!');
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <div className="flex items-center space-x-2 mt-4 ml-4">
        <Image src="/images/logo.png" alt="Logo LigaObra" width={100} height={100} />
        <span className="text-green-600 font-bold text-2xl">LigaObra</span>
      </div>

      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md mt-6">
        <h1 className="text-2xl font-bold text-center mb-6">Editar Prestador</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Tipo de Serviço"
            value={tipoServico}
            onChange={(e) => setTipoServico(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Segmento"
            value={segmento}
            onChange={(e) => setSegmento(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Site"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Atualizar Prestador
          </button>
        </form>

        <button
          onClick={() => router.push('/painel-prestador')}
          className="w-full mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
        >
          Voltar para o Painel
        </button>
      </div>
    </div>
  );
}
