import { Data, getData, Item } from "../../data/data";

// Function to return all items
export function getItems(): Item[] {
    const data: Data = getData();
    return data.items;
}

export function getItem(itemId: number): Item | string {
    const data: Data = getData();
    const item: Item | undefined = data.items.find((i) => i.itemId === itemId);

    if (item) {
        return item;
    } else {
        return "item not found";
    }
}