'use client';

import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-green-600 text-white flex flex-col justify-between">
      {/* Cabeçalho */}
      <div>
        <h2 className="text-2xl font-bold p-5 border-b border-green-700">LigaObra</h2>
        <nav className="p-5">
          <ul className="space-y-4">
            <li>
              <Link href="/painel">
                <button className="w-full text-left hover:bg-green-700 p-2 rounded-md">
                  Dashboard
                </button>
              </Link>
            </li>
            <li>
              <Link href="/painel/vagas">
                <button className="w-full text-left hover:bg-green-700 p-2 rounded-md">
                  Minhas Vagas
                </button>
              </Link>
            </li>
            <li>
              <Link href="/painel/perfil">
                <button className="w-full text-left hover:bg-green-700 p-2 rounded-md">
                  Editar Perfil
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Rodapé */}
      <div className="p-5 border-t border-green-700">
        <Link href="/login">
          <button className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-all">
            Sair
          </button>
        </Link>
      </div>
    </div>
  );
}
