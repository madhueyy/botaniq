import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Item } from "../../backend/src/data/data";
import { useCart } from "./CartContext";
import SnackBar from "./SnackBar";
import {
  HomeItemsProps,
  MaterialSymbolsStar,
  MaterialSymbolsStarOutline,
} from "./HomeItems";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomeItems2({
  itemPic,
  itemName,
  itemPrice,
  itemReviewStars,
  itemReviews,
  itemDesc,
}: HomeItemsProps) {
  const item: Item = {
    itemId: 3,
    picUrl: itemPic,
    name: itemName,
    price: itemPrice,
    reviewStars: itemReviewStars,
    reviews: itemReviews,
    itemDesc: itemDesc,
  };
  const { addItem } = useCart();

  // Initially snack bar closed
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  // Num of filled and not filled stars for review box
  const filledStars = itemReviewStars;
  const nonFilledStars = 5 - itemReviewStars;
  const isTablet = useMediaQuery("(max-width:1024px)");

  return (
    <>
      {/* Box for whole item */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: "4rem",
          paddingInline: isTablet ? "4rem" : "10rem",
        }}
      >
        {/* Box for outline/box shadow of item */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "0",
            borderRadius: "50px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "white",
          }}
        >
          {/* Box for item details */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: isTablet ? "2rem" : "4rem",
            }}
          >
            {/* Item name */}
            <Typography
              fontFamily={"Playfair Display"}
              fontWeight={600}
              variant={isTablet ? "h4" : "h3"}
              sx={{ color: "#f14837" }}
            >
              {itemName.toUpperCase()}
            </Typography>

            {/* Item price */}
            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={500}
              variant="h5"
              sx={{ color: "black" }}
            >
              ${itemPrice}.00
            </Typography>

            {/* Box for item review stars + reviews */}
            <Box
              sx={{
                marginTop: "0.5rem",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {Array.from({ length: filledStars }).map((_) => (
                <MaterialSymbolsStar />
              ))}

              {Array.from({ length: nonFilledStars }).map((_) => (
                <MaterialSymbolsStarOutline />
              ))}

              <Typography
                color="black"
                fontFamily={"Plus Jakarta Sans"}
                fontWeight={600}
                fontSize={14}
                sx={{ marginLeft: "0.25rem" }}
              >
                {itemReviews} Reviews
              </Typography>
            </Box>

            {/* Item description */}
            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontSize="1rem"
              sx={{
                color: "#F57D7F",
                textAlign: "left",
                marginTop: "0.5rem",
                paddingRight: "8rem",
              }}
            >
              {itemDesc}
            </Typography>

            {/* Add to cart button */}
            <Button
              onClick={() => {
                addItem(item, 1);
                setSnackbarOpen(true);
              }}
              sx={{
                marginTop: "1rem",
                fontFamily: "Plus Jakarta Sans",
                fontSize: "20px",
                fontWeight: 600,
                borderRadius: "12px",
                padding: "8px 24px",
                backgroundColor: "#f14837",
                boxShadow: 1,
                color: "white",
                height: "3rem",
                "&:hover": {
                  backgroundColor: "#F57D7F",
                },
              }}
            >
              ADD TO CART
            </Button>

            {/* Snackbar */}
            <SnackBar snackbarOpen={snackbarOpen} handleClose={handleClose} />
          </Box>

          {/* Box for image of item */}
          <Box sx={{ flexShrink: 0 }}>
            <img
              src={itemPic}
              alt="Item"
              style={{
                borderRadius: "45px",
              }}
            ></img>
          </Box>
        </Box>
      </Box>
    </>
  );
}
