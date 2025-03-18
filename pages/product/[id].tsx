import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Head from "next/head"
import React, { useState } from "react"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"


interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string
    priceId: string
  }
}

interface Product {
  id: string
  name: string
  price: number
  imageUrl: string
  priceId: string
}

export default function Product({product}: ProductProps) {
  const { addItem } = useContext(CartContext)


  function handleAddToCart(product: Product) {

    addItem({
      id: product.id,
      name: product.name,
      price:  product.price,
      imageUrl: product.imageUrl,
      priceId: product.priceId,
      quantity: 1
    })
  }

  return(
    <>
    <Head>
      <title>Product | Ignite Shop</title>
    </Head>
    
    <div className="grid  md:grid-cols-2 gap-16 max-w-6xl mx-auto">
      <div className="w-full max-w-xl  md:min-h-656 bg-product-gradient rounded-lg p-1 flex items-center justify-center">
        <Image src={product.imageUrl} alt="" width={520} height={420} className="object-cover"/>
      </div>

      <div className="flex flex-col min-h-[300px]">
        <h1 className="text-2xl text-gray-300">{product.name}</h1>
        <span className="mt-4 block text-2xl text-green-300">{new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(product.price / 100)}</span>

        <p className="mt-10 text-sm text-gray-300">{product.description}</p>

        <button onClick={() => handleAddToCart(product)}  className="mt-auto bg-green-500 border-0 text-white rounded-lg p-5 cursor-pointer font-bold text-sm hover:bg-green-300 ">Colocar na sacola</button>
      </div>
    </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_RlW88atUagMj9m' } },
      { params: { id: 'prod_RlW9JlstnnQM2C' } },
      { params: { id: 'prod_RlWAbRaxOdOBu7' } },
      { params: { id: 'prod_RlW7rlryxVJsjX' } }
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, {id: string}> = async ({params}) => {
 
  const productId = params!.id
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        priceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1
  }
}