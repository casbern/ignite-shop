import { createContext, ReactNode, useState } from "react"


interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  priceId: string
}

interface CartContextData {
  items: CartItem[]
  isCartOpen: boolean
  addItem: (item: CartItem) => void
  openCart: () => void
  closeCart: () => void
  removeItem: (id: string) => void
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartProvider( {children}: CartProviderProps ) {

  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  function addItem(product: CartItem) {
    
    const itemExists = items.find( item => item.id === product.id)

    if(!itemExists) {
      return setItems( items => [...items, {...product}])
    }

    setItems( items.map( item => {
      if(item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity! + 1
        }
      }
      return item
    }))
  }

  function removeItem(id: string) {

    const filteredItems = items.filter( item => item.id !== id)

    setItems([...filteredItems])

  }

  function openCart() {
    setIsCartOpen(true)
  }

  function closeCart() {
    setIsCartOpen(false)
  }
  
  return (
    <CartContext.Provider value={{ items, addItem, isCartOpen, openCart, closeCart, removeItem }}>
      {children}
    </CartContext.Provider>
  )

}