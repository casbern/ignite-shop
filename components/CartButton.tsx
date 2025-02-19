import { Handbag } from "@phosphor-icons/react"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"


export default function CartButton() {
  const { items } = useContext(CartContext)

  console.log(items)

  return (
    <div className="relative">
      <div className="bg-green-500 w-5 h-5 rounded-full absolute -top-1 -right-1 flex items-center justify-center text-sm">
        {items.length}
      </div>
      <button className="cursor-pointer rounded-lg p-3 bg-gray-800">
        <Handbag size={24} />
      </button>
    </div>
  )
}