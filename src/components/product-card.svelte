<script lang="ts">
	import { cartItemList, addToCart, removeFromCart } from '../stores/cart';
	export let product: Product;
	const { id: productId } = product;

	let productQuantity = 0;

	cartItemList.subscribe((currentList) => {
		const fromCart = currentList.find((item) => item.id === product.id);
		productQuantity = fromCart?.quantity ?? 0;
	});
</script>

<div class="card">
	<header class="card-header">
		<h2>{product.name}</h2>
	</header>
	<div class="card-body px-4">
		Quantity: <strong>{productQuantity}</strong>
	</div>
	<div class="card-body px-4">Price: ${product.price}</div>
	<footer class="card-footer">
		<button
			class="p-2 rounded variant-glass-primary"
			on:click|preventDefault={() => {
				addToCart({ id: productId });
			}}>Add</button
		>
		<button
			class="p-2 rounded variant-glass-error"
			on:click|preventDefault={() => {
				removeFromCart({ id: productId, removeOrReduce: 'reduce' });
			}}>Remove</button
		>
	</footer>
</div>
