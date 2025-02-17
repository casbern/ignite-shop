import { GetServerSideProps } from "next";
import Link from "next/link";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({customerName, product}: SuccessProps) {
  return (
    <>
    <Head>
      <title>Compra efetuada | Ignite Shop</title>
      <meta name="robots" content="noindex"/>
    </Head>

    <main className="flex flex-col items-center justify-center m-auto min-h-656">
      <h1 className="font-bold text-2xl text-gray-100">Compra efetuada!</h1>
      <div className="w-full mt-16 max-w-[130px] h-36 bg-product-gradient rounded-lg p-1 flex items-center justify-center">
        <Image src={product.imageUrl} width={120} height={110} alt="" className="object-cover" />
      </div>

      <p className="text-xl mt-8 text-gray-300 max-w-xl text-center">
        Uhull <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
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
  const product = session.line_items!.data[0].price!.product as Stripe.Product

  console.log(product.images[0])

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]

      }
    }
  }
}