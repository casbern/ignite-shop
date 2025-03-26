import { X } from "lucide-react"

import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"

//import Image from "next/image"

export default function CartModal() {
  const { isCartOpen, closeCart, items, removeItem } = useContext(CartContext) 
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  
  
  const totalPrice = items.reduce( (total, item) => {
    return total + (item.price * item.quantity!)
  },0) 


  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const products = items.map(item => ({
        priceId: item.priceId,
        quantity: item.quantity
      }))
      
      const response = await axios.post('/api/checkout', {
        products
      })

      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl

    } catch(err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar para o checkout')
    }
  }

  return (
    <AnimatePresence>
      { isCartOpen && (

      <motion.div
        key="cart-modal"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="fixed right-0 top-0 h-screen w-full md:w-[480px] bg-gray-900 overflow-y-auto p-12 shadow-lg"
      >

        <div className="flex flex-col flex-1  ">
          
          <header className="flex justify-between mb-8">
            <h2 className="text-xl font-bold">Sacola de compras</h2>

            <button onClick={closeCart} className="cursor-pointer">
              <X size={24} />
            </button> 
          </header>

          { items.map( item => {
            return (
              <div key={item.id} className="flex  gap-5 mb-6 ">
                <div className="bg-product-gradient rounded-lg">
                  <img src={item.imageUrl} width={94} height={94} alt=""/>
                </div>
                <div className="flex flex-col place-items-start justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-lg">{item.name}</h3>
                    <span className="text-sm">Quantidade: {item.quantity}</span>
                    <strong className="text-lg">{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(item.price / 100)}</strong>
                  </div>

                  <button onClick={ () => removeItem(item.id) } className="font-bold text-base text-green-300 hover:text-green-500">Remover</button>
                </div>
              </div>
            )})
          }

            <footer className="mt-auto pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-base">Quantidade</span>
                <span className="text-base">{items.reduce( (total, item) => total + item.quantity!, 0)} items</span>
              </div>

              <div className="flex justify-between">
                <strong className="text-lg">Valor total</strong>
                <strong className="text-2xl">{new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(totalPrice / 100)}</strong>
              </div>

              <button onClick={() => handleBuyProduct()} className="w-full mt-14 bg-green-300 enable:hover:bg-green-500 cursor-pointer rounded-lg p-5 font-bold disabled={isCreatingCheckoutSession} disabled:opacity-60 disabled:cursor-not-allowed">Finalizar compra</button>
            </footer>
        
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}