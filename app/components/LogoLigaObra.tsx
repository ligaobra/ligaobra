'use client'

import Image from 'next/image'

export default function LogoLigaObra() {
  return (
    <div className="flex items-center space-x-2">
      <Image src="/images/logo-ligaobra.png" alt="Logo LigaObra" width={80} height={80} />
      <span className="text-green-600 font-bold text-3xl">LigaObra</span>
    </div>
  )
}


