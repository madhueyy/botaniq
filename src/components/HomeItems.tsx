import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import type { SVGProps } from "react";
import { Item } from "../../backend/src/data/data";
import { useCart } from "./CartContext";
import SnackBar from "./SnackBar";

export type HomeItemsProps = {
  itemPic: string;
  itemName: string;
  itemPrice: number;
  itemReviewStars: number;
  itemReviews: number;
  itemDesc: string;
};

export default function HomeItems({
  itemPic,
  itemName,
  itemPrice,
  itemReviewStars,
  itemReviews,
  itemDesc,
}: HomeItemsProps) {
  const item: Item = {
    itemId: 2,
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

  return (
    <>
      {/* Box for whole item */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingTop: "4rem",
          paddingRight: "10rem",
          paddingLeft: "10rem",
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
          }}
        >
          {/* Box for image of item */}
          <Box sx={{ flexShrink: 0 }}>
            <img
              src={itemPic}
              alt="Item"
              style={{
                borderRadius: "45px",
                boxShadow: "36px 0px 32px rgba(241, 233, 218, 1)",
              }}
            ></img>
          </Box>

          {/* Box for item details */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginRight: "4rem",
            }}
          >
            {/* Item name */}
            <Typography
              fontFamily={"Playfair Display"}
              fontWeight={600}
              variant="h3"
              sx={{ color: "#3B7D56" }}
            >
              {itemName.toUpperCase()}
            </Typography>

            {/* Item price */}
            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={600}
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
              fontFamily={"Playfair Display"}
              fontSize="1.25rem"
              sx={{
                color: "#918C83",
                textAlign: "right",
                marginTop: "0.5rem",
                paddingLeft: "8rem",
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
                backgroundColor: "#F1E9DA",
                boxShadow: 1,
                color: "black",
                height: "3rem",
                "&:hover": {
                  backgroundColor: "#A6B591",
                },
              }}
            >
              ADD TO CART
            </Button>

            {/* Snackbar */}
            <SnackBar snackbarOpen={snackbarOpen} handleClose={handleClose} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

// Filled star
export function MaterialSymbolsStar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="black"
        d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
      ></path>
    </svg>
  );
}

// Unfilled star
export function MaterialSymbolsStarOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="black"
        d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zM5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275zM12 12.25"
      ></path>
    </svg>
  );
}
