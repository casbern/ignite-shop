import { createContext, ReactNode, useState } from "react"


interface CartItem {
  id: string
  name: string
  price: string
}

interface CartContextData {
  items: CartItem[]
  addItem: (item: CartItem) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider( {children}: CartProviderProps ) {
  const [items, setItems] = useState<CartItem[]>([])

  
  function addItem(item: CartItem) {
    setItems([...items, item])
  }
  
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  )

}