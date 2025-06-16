"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ListarPrestadores = () => {
  const [prestadores, setPrestadores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/prestadores');
        if (response.ok) {
          const data = await response.json();
          setPrestadores(data);
        } else {
          console.error('Erro ao carregar prestadores:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-green-600 mb-4">Lista de Prestadores</h1>
      <table className="table-auto w-full bg-white rounded-2xl shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Nome da Empresa</th>
            <th className="px-4 py-2">Tipo de Serviço</th>
            <th className="px-4 py-2">Cidade</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {prestadores.map((prestador) => (
            <tr key={prestador.id} className="border-b">
              <td className="px-4 py-2">{prestador.nomeEmpresa}</td>
              <td className="px-4 py-2">{prestador.tipoServico}</td>
              <td className="px-4 py-2">{prestador.cidade}</td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  onClick={() => router.push(`/painel/prestadores/detalhes/${prestador.id}`)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Ver Detalhes
                </button>
                <button
                  onClick={() => router.push(`/painel/prestadores/editar/${prestador.id}`)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarPrestadores;
