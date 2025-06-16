'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Trabalhador {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  cpfOuCnpj: string;
  senha: string;
}

export default function EditarTrabalhador() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cpfOuCnpj, setCpfOuCnpj] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    const fetchTrabalhador = async () => {
      try {
        const response = await fetch('/api/trabalhador-logado');
        if (response.ok) {
          const data: Trabalhador = await response.json();
          setNome(data.nome);
          setEmail(data.email);
          setTelefone(data.telefone);
          setCidade(data.cidade);
          setEstado(data.estado);
          setCpfOuCnpj(data.cpfOuCnpj);
          setSenha(data.senha);
        } else {
          console.error('Erro ao buscar trabalhador:', await response.json());
        }
      } catch (error) {
        console.error('Erro ao buscar trabalhador:', error);
      }
    };

    fetchTrabalhador();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trabalhadorAtualizado: Trabalhador = {
      id: id as string,
      nome,
      email,
      telefone,
      cidade,
      estado,
      cpfOuCnpj,
      senha,
    };

    try {
      const response = await fetch('/api/trabalhador-logado', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trabalhadorAtualizado),
      });

      if (response.ok) {
        alert('Dados atualizados com sucesso!');
        router.push('/painel/trabalhador');
      } else {
        const erro = await response.json();
        alert('Erro ao atualizar: ' + erro.mensagem);
      }
    } catch (error) {
      console.error('Erro no PUT:', error);
      alert('Erro ao tentar atualizar os dados.');
    }
  };

 import PainelWrapper from '../../../components/PainelWrapper';


return (
  <PainelWrapper>
    <h1 className="text-2xl font-bold text-green-700 text-center mb-6">Editar Trabalhador</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ...seus inputs e o botão... */}
    </form>
  </PainelWrapper>
  
)
}