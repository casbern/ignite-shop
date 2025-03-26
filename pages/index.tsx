import React from "react"
//import Image from "next/image"
import Link from "next/link"
import Head from "next/head"
import { GetStaticProps } from "next"

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import {stripe} from '../lib/stripe'
import Stripe from "stripe"

import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/CartContext"
import { ShoppingBag } from 'lucide-react'



interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
    priceId: string
  }[]
}

interface ProductProps {
  id: string
  name: string
  price: number
  imageUrl: string
  priceId: string
}

export default function Home({products}: HomeProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  const { addItem } = useContext(CartContext)

  useEffect( () => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()

    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>, product: ProductProps) {
    e.preventDefault()

    addItem({
      id: product.id,
      name: product.name,
      price:  product.price,
      imageUrl: product.imageUrl,
      priceId: product.priceId,
      quantity: 1
    })
  }


  return (
    <>
    <Head>
        <title>Home | Ignite Shop</title>
    </Head>

    { isMobile ? (
      <div className="flex flex-col gap-4 w-full px-4">
      {products.map(product => (
        <Link prefetch={false} href={`/product/${product.id}`} key={product.id}>
          <a className="bg-product-gradient rounded-lg cursor-pointer relative flex flex-col items-center justify-center p-4">
            <div className="w-full flex justify-center">
              <img src={product.imageUrl} alt="" width={240} height={220}  />
            </div>
            
            <footer className="w-full p-4 flex items-center justify-between bg-product-footer rounded-md mt-2">
              <div className="flex flex-col gap-1">
                <strong className="text-lg">{product.name}</strong>
                <span className="text-xl font-bold text-green-300">{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price / 100)}</span>
              </div>
              <button onClick={(e) => handleAddToCart(e, product)} className="cursor-pointer rounded-lg p-3 bg-green-500 hover:bg-green-300">
                <ShoppingBag size={24}/>
              </button>
            </footer>
          </a>
        </Link>
      ))}
    </div>
    ) : (
    <div ref={sliderRef} className=" keen-slider flex  w-full max-w-custom-calc ml-auto min-h-656 "> 
       {
        products.map( product => {
          return (
            <Link prefetch={false} href={`/product/${product.id}`} key={product.id}>
            <a  className="keen-slider__slide  group bg-product-gradient rounded-lg  cursor-pointer relative flex items-center justify-center object-cover">
              <img src={product.imageUrl} alt="" width={520} height={480}/>
        
              <footer className="absolute bottom-1 left-1 right-1 rounded-md p-8 flex  items-center justify-between bg-product-footer translate-y-full opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex flex-col gap-1">
                  <strong className="text-lg">{product.name}</strong>
                  <span className="text-xl font-bold text-green-300">{new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(product.price / 100)}</span>
                </div>
                <button onClick={(e) => handleAddToCart(e, product)} className="cursor-pointer rounded-lg p-3 bg-green-500 hover:bg-green-300">
                  <ShoppingBag size={32} />
                </button>
              </footer>
            </a>
            </Link>
          )
        })
       }
    </div>
    )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map( product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      priceId: price.id
    }
  } )

  return {
    props: {
      products: products,
      revalidate: 60 * 60 * 2
    }
  }
}
