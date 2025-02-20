import { X } from "@phosphor-icons/react"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import Image from "next/image"

export default function CartModal() {
  const { isCartOpen, closeCart, items } = useContext(CartContext) 

  if(!isCartOpen) return null

  return (
    <div className="flex flex-col fixed right-0 top-0 h-screen w-[480px] bg-gray-900 p-12">
      
      <header className="flex justify-between mb-8">
        <h2 className="text-xl font-bold">Sacola de compras</h2>

        <button onClick={closeCart} className="cursor-pointer">
          <X size={24} />
        </button>
      </header>

    { items.map( item => {
      return (
        <div key={item.id} className="flex gap-5 mb-6">
          <div className="bg-product-gradient rounded-lg">
            <Image src={item.imageUrl} width={94} height={94} alt=""/>
          </div>
          <div className="flex flex-col place-items-start justify-between">
            <div>
              <h3 className="text-lg">{item.name}</h3>
              <strong className="text-lg">{item.price}</strong>
            </div>

            <button className="font-bold text-base text-green-300 hover:text-green-500">Remover</button>
          </div>
        </div>
      )})
    }

      <footer className="mt-auto">
        <div className="flex justify-between mb-2">
          <span className="text-base">Quantidade</span>
          <span className="text-base">{items.length} items</span>
        </div>

        <div className="flex justify-between">
          <strong className="text-lg">Valor total</strong>
          <strong className="text-2xl">R$ 280,00</strong>
        </div>

        <button className="w-full mt-14 bg-green-300 hover:bg-green-500 cursor-pointer rounded-lg p-5 font-bold">Finalizar compra</button>
      </footer>
    </div>
  )
}