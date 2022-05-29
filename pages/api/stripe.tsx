// const stripe = require('stripe')("sk_test_51L4igYIC0VhkHFbjjUJpJWi3tI1v8sUp7YODprCrbUhT9CFVTcrqbeRzpChE6oCmz56b3PetQ9DEIwPDbwfyuAYJ00uuTjV0P0");

import Stripe from 'stripe'

const SECRET_KEY = "sk_test_51L4igYIC0VhkHFbjjUJpJWi3tI1v8sUp7YODprCrbUhT9CFVTcrqbeRzpChE6oCmz56b3PetQ9DEIwPDbwfyuAYJ00uuTjV0P0"
const stripe = new Stripe(SECRET_KEY, {apiVersion: '2020-08-27'})

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Create Checkout Sessions from body params.
            console.log(req.body);
            const params = {
                submit_type: "pay",
                payment_method_types: ["card"],
                billing_address_collection: "auto",
                shipping_options: [
                    {shipping_rate: "shr_1L4izIIC0VhkHFbjay7FaHYC"}
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImg = img.replace('image-', 'https://cdn.sanity.io/images/quviczr5/production/').replace('-webp', 'webp')
                    console.log('image', newImg)
                    return {
                        price_data: {
                            currency: 'jpy',
                            product_data: {
                                name: item.name,
                                images: [newImg],
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                mode: 'payment',
                success_url: `${ req.headers.origin }/success`,
                cancel_url: `${ req.headers.origin }/`,
            }
            // @ts-ignore
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
            // res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
