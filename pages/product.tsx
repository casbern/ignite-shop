import Image from "next/image"
import React from "react"

export default function Product() {
  return(
    <div className="grid grid-cols-2 gap-16 max-w-6xl mx-auto">
      <div className="w-full max-w-xl min-h-656 bg-product-gradient rounded-lg p-1 flex items-center justify-center">
        {/* <Image src={} alt="" className="object-cover"/> */}
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl text-gray-300">Camiseta X</h1>
        <span className="mt-4 block text-2xl text-green-300">R$ 89.90</span>

        <p className="mt-10 text-sm text-gray-300">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam non nesciunt distinctio dicta! Autem cupiditate sunt porro obcaecati natus, veritatis accusamus mollitia doloribus, quo labore beatae debitis dolorum nesciunt.</p>

        <button className="mt-auto bg-green-500 border-0 text-white rounded-lg p-5 cursor-pointer font-bold text-sm hover:bg-green-300">Comprar agora</button>
      </div>
    </div>
  )
}