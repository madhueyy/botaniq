import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "../../backend/src/data/data";
import Navbar from "../components/Navbar";
import {
  MaterialSymbolsStar,
  MaterialSymbolsStarOutline,
} from "../components/HomeItems";
import QuantityInput from "../components/QuantityInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCart } from "../components/CartContext";
import RelatedItems from "../components/RelatedItems";
import SnackBar from "../components/SnackBar";
import "./Item.css";

export default function ItemDetail() {
  const { itemId } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  // Hook for navigation
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/shop");
  };

  // Function to fetch item
  const fetchItem = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/getitem/${itemId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setItem(data.item);
      console.log(item);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Run on first render,
  // render anytime itemId changes in the route
  useEffect(() => {
    fetchItem();
  }, [itemId]);

  // If item not found
  if (!item) {
    return (
      <div className="bg">
        <Navbar />

        {/* Box for go back button */}
        <Box sx={{ marginY: "2rem", paddingLeft: 12 }}>
          {/* Box for back button */}
          <Box flex={1} display="flex">
            <Button
              onClick={handleBackClick}
              sx={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "4px",
                padding: "8px 24px",
                backgroundColor: "#F2F2F2",
                color: "black",
                height: 50,
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "#A6B591",
                },
              }}
            >
              <ArrowBackIcon sx={{ marginRight: 2 }} />
              Go to shop
            </Button>
          </Box>
        </Box>

        {/* Box for item not found text */}
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={700}
            color="black"
          >
            Item not found
          </Typography>
        </Box>
      </div>
    );
  }

  // Num of filled and not filled stars for review box
  const filledStars = item.reviewStars;
  const nonFilledStars = 5 - item.reviewStars;

  // If item found
  return (
    <div className="bg">
      <Navbar />

      {/* Box for go back button */}
      <Box sx={{ marginY: "2rem", paddingLeft: 12 }}>
        {/* Box for back button */}
        <Box flex={1} display="flex">
          <Button
            onClick={handleBackClick}
            sx={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "4px",
              padding: "8px 24px",
              backgroundColor: "#F2F2F2",
              color: "black",
              height: 50,
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "#A6B591",
              },
            }}
          >
            <ArrowBackIcon sx={{ marginRight: 2 }} />
            Go back
          </Button>
        </Box>
      </Box>

      {/* Box for all of the item */}
      <Box>
        {/* Box for item */}
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={12}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ marginRight: "8rem", marginLeft: "8rem" }}
        >
          {/* Box for image */}
          <Box sx={{ width: "100rem" }}>
            <img
              src={item.picUrl}
              alt="Item"
              style={{
                borderRadius: "45px",
                boxShadow: "36px 0px 32px rgba(241, 233, 218, 1)",
                transition: "transform 0.1s ease-in-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-10px) translateX(-10px)";
                e.currentTarget.style.boxShadow =
                  "36px 12px 32px rgba(184, 201, 161, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) translateX(0)";
                e.currentTarget.style.boxShadow =
                  "36px 0px 32px rgba(241, 233, 218, 1)";
              }}
            />
          </Box>

          {/* Box for text and buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Title/name of plant */}
            <Typography
              fontFamily={"Playfair Display"}
              fontWeight={700}
              variant="h2"
              sx={{ color: "#3B7D56" }}
            >
              {item.name.toUpperCase()}
            </Typography>

            {/* Price of plant */}
            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={600}
              variant="h4"
              color="black"
              marginTop="1rem"
            >
              ${item.price}.00
            </Typography>

            {/* Box for review */}
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* Review stars */}
              {Array.from({ length: filledStars }).map((_) => (
                <MaterialSymbolsStar />
              ))}

              {Array.from({ length: nonFilledStars }).map((_) => (
                <MaterialSymbolsStarOutline />
              ))}

              {/* Review number */}
              <Typography
                color="black"
                fontFamily={"Plus Jakarta Sans"}
                fontWeight={600}
                fontSize={14}
                sx={{ marginLeft: "0.25rem" }}
              >
                {item.reviews} Reviews
              </Typography>
            </Box>

            {/* Description of plant */}
            <Typography
              fontFamily={"Playfair Display"}
              fontSize="1.25rem"
              sx={{
                marginTop: "1rem",
                color: "#918C83",
                textAlign: "left",
              }}
            >
              {item.itemDesc}
            </Typography>

            {/* Box for buttons */}
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              width="100%"
              flexDirection={"row"}
            >
              {/* Box for quantity input */}
              <Box sx={{ marginTop: "38px", padding: "8px 24px" }}>
                <QuantityInput quantity={quantity} setQuantity={setQuantity} />
              </Box>

              {/* Add to cart button */}
              <Button
                onClick={() => {
                  addItem(item, quantity);
                  setSnackbarOpen(true);
                }}
                sx={{
                  marginTop: "40px",
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
      </Box>
      {/* Box for related items */}
      <Box marginTop="2rem" marginLeft="4rem">
        <Typography
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={500}
          variant="h5"
          sx={{ color: "black" }}
        >
          Related Items
        </Typography>

        <Box marginX={"2rem"} marginTop={"2rem"} marginBottom={"4rem"}>
          <RelatedItems itemId={item.itemId} itemPrice={item.price} />
        </Box>
      </Box>
    </div>
  );
}
