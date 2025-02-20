import { createContext, ReactNode, useState } from "react"


interface CartItem {
  id: string
  name: string
  price: string
  imageUrl: string
}

interface CartContextData {
  items: CartItem[]
  isCartOpen: boolean
  addItem: (item: CartItem) => void
  openCart: () => void
  closeCart: () => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider( {children}: CartProviderProps ) {

  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  
  function addItem(item: CartItem) {
    setItems([...items, item])
  }

  function openCart() {
    setIsCartOpen(true)
  }

  function closeCart() {
    setIsCartOpen(false)
  }
  
  return (
    <CartContext.Provider value={{ items, addItem, isCartOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )

}