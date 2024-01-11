// place files you want to import through the `$lib` alias in this folder.
export function removedAtIndex(itemList: unknown[], index: number) {
	return [...itemList.slice(0, index), ...itemList.slice(index + 1)];
}
