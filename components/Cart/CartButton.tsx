//import { Handbag } from "@phosphor-icons/react"
import { ShoppingBag } from 'lucide-react'

import { useContext } from "react"
import { CartContext } from "../../context/CartContext"


export default function CartButton() {
  const { items, openCart } = useContext(CartContext)

  const totalQuantity = items.reduce( (total, item) => total + item.quantity, 0)

  return (
    <div className="relative">
      <div className="bg-green-500 w-5 h-5 rounded-full absolute -top-1 -right-1 flex items-center justify-center text-sm">
        {totalQuantity}
      </div>
      <button onClick={openCart} className="cursor-pointer rounded-lg p-3 bg-gray-800">
        <ShoppingBag size={24} />
      </button>
    </div>
  )
}