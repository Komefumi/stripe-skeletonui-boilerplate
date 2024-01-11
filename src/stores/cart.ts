import { removedAtIndex } from '$lib';
import { writable } from 'svelte/store';

export const cartItemList = writable<CartItem[]>([]);

function getIndexInCartItemList(opts: { id: string; searchList: CartItem[] }) {
	const { id, searchList } = opts;
	const idxExisting = searchList.findIndex((value) => value.id === id);
	return idxExisting;
}

// Add to cart function
export function addToCart(opts: CartSearchArgs) {
	cartItemList.update((current) => {
		const idxExisting = getIndexInCartItemList({ ...opts, searchList: current });
		if (idxExisting === -1) {
			return [...current, { id: opts.id, quantity: 1 }];
		}

		const itemExisting = current[idxExisting];
		return [
			...current.slice(0, idxExisting),
			{
				...itemExisting,
				quantity: itemExisting.quantity + 1
			},
			...current.slice(idxExisting + 1)
		];
	});
}

// Remove from cart function
export function removeFromCart(opts: { id: string; removeOrReduce: 'remove' | 'reduce' }) {
	cartItemList.update((current) => {
		const idxExisting = getIndexInCartItemList({ ...opts, searchList: current });
		if (idxExisting === -1) return [...current];
		if (opts.removeOrReduce === 'remove') {
			return removedAtIndex(current, idxExisting) as CartItem[];
		}

		const itemExisting = current[idxExisting];
		if (itemExisting.quantity < 2) {
			return removedAtIndex(current, idxExisting) as CartItem[];
		}

		return [
			...current.slice(0, idxExisting),
			{
				...itemExisting,
				quantity: itemExisting.quantity - 1
			},
			...current.slice(idxExisting + 1)
		];
	});
}
