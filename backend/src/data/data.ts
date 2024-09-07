import * as fs from "fs";

export interface Item {
    itemId: number;
    picUrl: string;
    name: string;
    price: number;
    reviewStars: number;
    reviews: number;
    itemDesc: string;
}

export interface Data {
    items: Item[];
}

const filePath: string = "src/data/datastore.json";

const data = parseData() as Data;

export function getData(): Data {
    return data;
}

function parseData(): Data | null {
    try {
        const data = fs.readFileSync(filePath, "utf-8");

        const jsonData = JSON.parse(data);

        const convertedData: Data = {
            items: jsonData.items.map((item: Item) => ({
                itemId: item.itemId,
                picUrl: item.picUrl,
                name: item.name,
                price: item.price,
                reviewStars: item.reviewStars,
                reviews: item.reviews,
                itemDesc: item.itemDesc,
            })),
        };

        return convertedData;
        
    } catch (err) {
        console.error("Error reading or parsing the file:", err);
        return null;
    }
}