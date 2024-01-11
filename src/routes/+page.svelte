<script lang="ts">
	import ProductCard from '../components/product-card.svelte';
	import { cartItemList } from '../stores/cart';
	let checkoutInProgress = false;

	const productList: Product[] = [
		{
			id: 'price_1OXMSISC0eZ45QoF3e7UwYVM',
			name: 'Coffee',
			price: 5
		},
		{
			id: 'price_1OXMa3SC0eZ45QoFWLKxKWRk',
			name: 'Sunglasses',
			price: 10
		},
		{
			id: 'price_1OXMabSC0eZ45QoFMcAUK46E',
			name: 'Water Bottle',
			price: 15
		}
	];

	async function checkout() {
		try {
			checkoutInProgress = true;
			const data = await (
				await fetch(`api/stripe-checkout`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						itemList: $cartItemList
					})
				})
			).json();
			console.log({ data });
			window.location.replace(data.url);
		} catch (error) {
			console.error(error);
		} finally {
			checkoutInProgress = false;
		}
	}
</script>

<div class="container h-screen mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1 class="text-6xl">Sveltekit 1.0 Store</h1>
		</div>
		{#each productList as product (product.id)}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<button
				class="btn variant-filled-primary"
				disabled={checkoutInProgress}
				on:click={() => {
					checkout();
				}}>Checkout with Stripe API</button
			>
		</div>
	</div>
</div>
