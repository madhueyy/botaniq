import { useEffect, useState } from "react";
import { Item } from "../../backend/src/data/data";
import { Box, Typography } from "@mui/material";
import ShopItem from "./ShopItem";

interface RelatedItemsProps {
  itemId: number;
  itemPrice: number;
}

export default function RelatedItems({ itemId, itemPrice }: RelatedItemsProps) {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  // Function to fetch and filter all the plants
  // based on name similarity
  const fetchAndFilterItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getitems");

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();
      const allItems: Item[] = data.items;

      // Filter items based on price similarity
      const minPrice = itemPrice - 10;
      const maxPrice = itemPrice + 10;

      const relatedItems = allItems
        .filter(
          (item) =>
            item.itemId !== itemId &&
            item.price >= minPrice &&
            item.price <= maxPrice
        )
        .slice(0, 6);

      setFilteredItems(relatedItems);
    } catch (error) {
      console.error("Error fetching and filtering items:", error);
    }
  };

  // Run on first render,
  // render anytime itemName changes
  useEffect(() => {
    fetchAndFilterItems();
  }, [itemPrice]);

  return (
    <>
      <Box display={"flex"} flexDirection={"row"} gap={8}>
        {/* If filtered related items and there's > 0 then
        show map items' key to show each ShopItem, else
        show no related items text */}
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ShopItem
              key={item.itemId}
              itemId={item.itemId}
              itemPic={item.picUrl}
              itemName={item.name}
              itemPrice={item.price}
              itemReviewStars={item.reviewStars}
              itemReviews={item.reviews}
              itemDesc={item.itemDesc}
            />
          ))
        ) : (
          <Typography
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={400}
            variant="h6"
            color="gray"
          >
            No related items found
          </Typography>
        )}
      </Box>
    </>
  );
}
