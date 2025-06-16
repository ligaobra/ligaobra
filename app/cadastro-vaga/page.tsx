'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CadastroVaga() {
  const router = useRouter();
  const [vaga, setVaga] = useState ({
  titulo: '',
  cidade: '',
  estado: '',
  tipoContrato: '',
  faixaSalarial: '',
  inicioPrevisto: '',
  descricao: '',
  whatsapp: '',
  nomeEmpresa: '',
  instagram: '',
  site: '',
  email: '',
  indicadoPor: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setVaga({ ...vaga, [e.target.name]: e.target.value });

  };

  const handleSubmit = async () => {
    const response = await fetch('/api/vagas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(vaga)
    });

    if (response.ok) {
      router.push('/');
    } else {
      alert('Erro ao cadastrar vaga');
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Logo e nome no topo */}
      <div className="flex items-center space-x-2 mt-4 ml-4">
        <Image src="/images/logo.png" alt="Logo LigaObra" width={100} height={100} />
        <span className="text-green-600 font-bold text-2xl">LigaObra</span>
      </div>

      {/* Painel central */}
      <div className="flex items-center justify-center pt-10">
        <div className="bg-gray-600 p-6 rounded shadow-md w-full max-w-md text-white">
          <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Vaga</h1>
<input
  className="w-full p-2 mb-4 rounded text-black"
  type="text"
  name="titulo"
  placeholder="Título da Vaga"
  value={vaga.titulo}
  onChange={handleChange}
/>

<textarea
  className="w-full p-2 mb-4 rounded text-black"
  name="descricao"
  placeholder="Descrição da Vaga"
  value={vaga.descricao}
  onChange={handleChange}
/>

<input
  className="w-full p-2 mb-4 rounded text-black"
  type="text"
  name="cidade"
  placeholder="Cidade"
  value={vaga.cidade}
  onChange={handleChange}
/>

<input
  className="w-full p-2 mb-4 rounded text-black"
  type="text"
  name="estado"
  placeholder="Estado"
  value={vaga.estado}
  onChange={handleChange}
/>

<input
  className="w-full p-2 mb-4 rounded text-black"
  type="text"
  name="tipoContrato"
  placeholder="Tipo de Contrato"
  value={vaga.tipoContrato}
  onChange={handleChange}
/>

          <input
            className="w-full p-2 mb-4 rounded text-black"
            type="text"
            name="faixaSalarial"
            placeholder="Faixa Salarial"
            value={vaga.faixaSalarial}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 mb-4 rounded text-black"
            type="text"
            name="inicioPrevisto"
            placeholder="Início Previsto"
           value={vaga.inicioPrevisto}
            onChange={handleChange}
          />

          <input
  type="text"
  placeholder="Nome da Empresa"
  value={vaga.nomeEmpresa}
  onChange={(e) => setVaga({ ...vaga, nomeEmpresa: e.target.value })}
  className="w-full border p-2 rounded mb-2"
/>

<input
  type="text"
  placeholder="Instagram (@empresa)"
  value={vaga.instagram}
  onChange={(e) => setVaga({ ...vaga, instagram: e.target.value })}
  className="w-full border p-2 rounded mb-2"
/>

<input
  type="url"
  placeholder="Site da empresa"
  value={vaga.site}
  onChange={(e) => setVaga({ ...vaga, site: e.target.value })}
  className="w-full border p-2 rounded mb-2"
/>

<input
  type="email"
  placeholder="E-mail para contato"
  value={vaga.email}
  onChange={(e) => setVaga({ ...vaga, email: e.target.value })}
  className="w-full border p-2 rounded mb-2"
/>

<input
  type="text"
  placeholder="Indicado por (opcional)"
  value={vaga.indicadoPor}
  onChange={(e) => setVaga({ ...vaga, indicadoPor: e.target.value })}
  className="w-full border p-2 rounded mb-4"
/>


          {/* Link de recuperação */}
          <a
            href="/recuperar-senha"
            className="text-sm text-white hover:underline cursor-pointer mt-2 ml-1 block mb-4"
          >
            Esqueci minha senha
          </a>

          {/* Botões padronizados */}
          <div className="flex gap-4 mt-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Publicar Vaga
            </button>
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => router.push('/')}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

