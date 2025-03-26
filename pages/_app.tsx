import '../styles/globals.css'
import { AppProps } from 'next/app'
//import Image from 'next/image'
import { CartProvider } from '../context/CartContext'
import  CartButton  from '../components/Cart/CartButton'
import CartModal from '../components/Cart/CartModal'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <CartProvider>
        <div className='flex flex-col items-start min-h-screen px-4 md:px-0 '>
          <div className='py-8 px-0 w-full max-w-6xl my-0 mx-auto flex justify-between'>
            <a href={'/'} className='cursor-pointer'>
              <img src="/logo.svg" width={140} height={140} alt="" />
            </a>

            <CartButton />
          </div>
            <Component {...pageProps} /> 
            <CartModal />
        </div>
      </CartProvider>
  )
}

