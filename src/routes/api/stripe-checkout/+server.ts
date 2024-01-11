import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';

const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2023-10-16'
});
// localhost:5173/api/stripe-checkout

// POST: stripe-checkout data: items
// return -> url created by Stripe for our users to use

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const { itemList } = data;

	let lineItemList: any[] = [];
	itemList.forEach((item: any) => {
		lineItemList.push({ price: item.id, quantity: item.quantity });
	});

	// It gives us a URL for the person to checkout with
	const session = await stripe.checkout.sessions.create({
		line_items: lineItemList,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
