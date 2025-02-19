import '../styles/globals.css'
import logo from '../assets/logo.svg'
import { AppProps } from 'next/app'
import Image from 'next/image'
import { CartProvider } from '../context/CartContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <CartProvider>
        <div className='flex flex-col items-start min-h-screen '>
          <div className='py-8 px-0 w-full max-w-6xl my-0 mx-auto '>
            <a href={'/'} className='cursor-pointer'>
              <Image src={logo} alt="" />
            </a>
          </div>

            <Component {...pageProps} /> 
        </div>
      </CartProvider>
  )
}

