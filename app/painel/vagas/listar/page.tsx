'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Vaga {
  id: string;
  titulo: string;
  cidade: string;
  estado: string;
  tipoContrato: string;
  faixaSalarial: string;
  inicioPrevisto: string;
}

export default function ListarVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch('/api/vagas');
        const data = await response.json();
        setVagas(data);
      } catch (error) {
        console.error('Erro ao carregar vagas:', error);
      }
    };

    fetchVagas();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-success mb-4">Lista de Vagas</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Título</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Tipo de Contrato</th>
            <th>Faixa Salarial</th>
            <th>Início Previsto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vagas.map((vaga) => (
            <tr key={vaga.id}>
              <td>{vaga.titulo}</td>
              <td>{vaga.cidade}</td>
              <td>{vaga.estado}</td>
              <td>{vaga.tipoContrato}</td>
              <td>{vaga.faixaSalarial}</td>
              <td>{vaga.inicioPrevisto}</td>
              <td className="d-flex justify-content-between">
                <Link href={`/painel/vagas/detalhes/${vaga.id}`} className="btn btn-primary btn-sm">
                  Ver Detalhes
                </Link>
                <Link href={`/painel/vagas/editar/${vaga.id}`} className="btn btn-warning btn-sm mx-2">
                  Editar
                </Link>
                <button className="btn btn-danger btn-sm">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
