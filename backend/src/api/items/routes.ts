import express from "express";
import { getItem, getItems } from "../../lib/items/item-functions";

const router = express.Router();

router.get("/getitems", (req, res) => {
  try {
    const items = getItems();
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: "Failed to get items" });
  }
});

router.get("/getitem/:itemId", (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);

  if (isNaN(itemId)) {
    return res.status(400).json({ error: "Invalid itemId" });
  }

  try {
    const item = getItem(itemId);

    if (typeof item === "string") {
      return res.status(404).json({ error: item });
    }

    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ error: "Failed to get item" });
  }
});

export default router;