import { GetServerSideProps } from "next";
import Link from "next/link";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string
  products: {
    id: string
    name: string
    imageUrl: string
    quantity: number
  }[]
}

export default function Success({customerName, products}: SuccessProps) {
  console.log( products )

  const totalQuantity = products.reduce( (total, product) => {
    return total + product.quantity
  }, 0)
 
  

  return (
    <>
    <Head>
      <title>Compra efetuada | Ignite Shop</title>
      <meta name="robots" content="noindex"/>
    </Head>

    <main className=" flex flex-col items-center justify-center m-auto min-h-656">

      <div  className="flex flex-row items-center justify-center mb-12">
      {
        products.map( product => (
            <div key={product.id} className=" bg-product-gradient rounded-full p-1 -ml-8 z-10 shadow-2xl">
              <Image src={product.imageUrl} width={140} height={140} alt="" className="object-cover" />
            </div>
        ))
      }
      </div>

          <h1 className="font-bold text-2xl text-gray-100">Compra efetuada!</h1>

          <p className="text-xl mt-8 text-gray-300 max-w-xl text-center">
          🎉🎉🎉 Uhull   <strong>{customerName.toLocaleUpperCase()}</strong>, sua compra de <strong>{totalQuantity}</strong> {
              totalQuantity > 1 ? <p>camisetas já estão a caminho da sua casa.</p> : <p>camiseta já está a caminho da sua casa.</p>
            } 
          </p>

      <Link href="/" >
      <a className="mt-20 font-bold no-underline block text-lg text-green-500 hover:text-green-300">Voltar ao catálogo</a></Link>
    </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if(!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details!.name
  const products = session.line_items!.data.map(item => {
    const product = item.price!.product as Stripe.Product

    return {
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
      id: product.id
    }
  })


  return {
    props: {
      customerName,
      products
    }
  }
}