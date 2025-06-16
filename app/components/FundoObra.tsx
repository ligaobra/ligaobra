'use client'

import Image from 'next/image'

export default function FundoObra() {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/obra-fundo.png"
        alt="Fundo de obra"
        fill
        className="object-cover w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
    </div>
  )
}
