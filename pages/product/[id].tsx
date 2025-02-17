import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Head from "next/head"
import React, { useState } from "react"
import { stripe } from "../../lib/stripe"
import { useRouter } from "next/router"
import Stripe from "stripe"
import axios from "axios"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({product}: ProductProps) {
  const { isFallback: isLoading } = useRouter()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch(err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar para o checkout')
    }
  }

  if(isLoading) {
    return <p>Loading...</p>
  }
  return(
    <>
    <Head>
      <title>Product | Ignite Shop</title>
    </Head>
    
    <div className="grid grid-cols-2 gap-16 max-w-6xl mx-auto">
      <div className="w-full max-w-xl min-h-656 bg-product-gradient rounded-lg p-1 flex items-center justify-center">
        <Image src={product.imageUrl} alt="" width={520} height={480} className="object-cover"/>
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl text-gray-300">{product.name}</h1>
        <span className="mt-4 block text-2xl text-green-300">{product.price}</span>

        <p className="mt-10 text-sm text-gray-300">{product.description}</p>

        <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession} className="mt-auto bg-green-500 border-0 text-white rounded-lg p-5 cursor-pointer font-bold text-sm enable:hover:bg-green-300 disabled:opacity-60 disabled:cursor-not-allowed">Comprar agora</button>
      </div>
    </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
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
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1
  }
}