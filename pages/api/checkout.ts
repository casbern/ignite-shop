import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../lib/stripe"

interface CheckoutProduct {
  priceId: string
  quantity: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if(req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed." })
  }

  const {products} = req.body as { products: CheckoutProduct[]}

  if(!products || products.length === 0) {
    return res.status(400).json({ error: "Products not found." })
  }
  
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products.map(product => ({
      price: product.priceId,
      quantity: product.quantity
    }))
  })
  
  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}