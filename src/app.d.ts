// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare module '$env/static/private' {
	export const SECRET_STRIPE_KEY: string;
}

declare class Product {
	id: string; // Stripe id
	name: string;
	price: number;
}

declare class CartItem {
	id: string;
	quantity: number;
}

declare class CartSearchArgs {
	id: string;
}
