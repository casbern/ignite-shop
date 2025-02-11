import '../styles/globals.css'
import logo from '../assets/logo.svg'
import { AppProps } from 'next/app'
import Image from 'next/image'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='flex flex-col items-start min-h-screen '>
      <div className='py-8 px-0 w-full max-w-6xl my-0 mx-auto '>
        <Image src={logo} alt="" />
      </div>

      <Component {...pageProps} /> 
    </div>
  )
}

