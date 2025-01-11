import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useCart, Item } from "../components/CartContext";
import Navbar from "../components/Navbar";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Checkout() {
  const { items, removeItem, updateItemQuantity } = useCart();
  const isMobile = useMediaQuery("(max-width:768px)");

  // Function to calculate total price
  const calculateTotal = () => {
    return items.reduce(
      (total: number, item: Item) => total + item.price * item.quantity,
      0
    );
  };

  // Hook for navigation
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/shop");
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    updateItemQuantity(itemId, newQuantity);
  };

  // When cart is empty
  if (items.length === 0) {
    return (
      <div className="bg">
        <Navbar />

        {/* Box for go back button */}
        <Box sx={{ marginY: "2rem", paddingLeft: isMobile ? 4 : 12 }}>
          {/* Box for back button */}
          <Box flex={1} display="flex">
            <Button
              onClick={handleBackClick}
              startIcon={<ArrowBackIcon />}
              sx={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: isMobile ? "12px" : "16px",
                fontWeight: 600,
                borderRadius: "4px",
                padding: isMobile ? "8px 16px" : "8px 24px",
                backgroundColor: "#f14837",
                color: "white",
                height: isMobile ? 40 : 50,
                boxShadow: 1,
                "&:hover": {
                  backgroundColor: "#F57D7F",
                },
              }}
            >
              Go to shop
            </Button>
          </Box>
        </Box>

        {/* Box for cart is empty text */}
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={700}
            color="black"
          >
            Your cart is empty
          </Typography>
        </Box>
      </div>
    );
  }

  // When cart isn't empty
  return (
    <div className="bg">
      <Navbar />

      {/* Box for whole thing */}
      <Box sx={{ marginTop: "1rem", paddingX: isMobile ? 4 : 12 }}>
        <Typography
          variant="h4"
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={700}
          color="black"
        >
          Your Cart
        </Typography>

        <Divider sx={{ marginY: "1rem" }} />

        {/* Box for all cart items */}
        {items.map((item: Item) => (
          <Box
            key={item.itemId}
            sx={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Box for item */}
            <Box display={"flex"} flexDirection={"row"} gap={2}>
              {/* Box for item image */}
              <Box sx={{ width: "8rem" }}>
                <img
                  src={item.picUrl}
                  alt="Item"
                  style={{
                    borderRadius: "12px",
                  }}
                ></img>
              </Box>

              {/* Box for item details */}
              <Box
                display={"flex"}
                flexDirection={"column"}
                gap={1}
                alignItems="left"
              >
                {/* Item name */}
                <Typography
                  fontFamily={"Plus Jakarta Sans"}
                  fontSize="1.25rem"
                  fontWeight={600}
                  color="white"
                >
                  {item.name}
                </Typography>

                {/* Item price */}
                <Typography
                  fontFamily={"Plus Jakarta Sans"}
                  fontWeight={600}
                  color="black"
                >
                  ${item.price}.00
                </Typography>

                {/* Box for quantity selector */}
                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                  sx={{ marginTop: "0.5rem" }}
                >
                  <FormControl size="small">
                    <InputLabel sx={{ fontFamily: "Plus Jakarta Sans" }}>
                      Qty
                    </InputLabel>

                    <Select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.itemId,
                          e.target.value as number
                        )
                      }
                      label="Qty"
                      sx={{ minWidth: 60, fontFamily: "Plus Jakarta Sans" }}
                    >
                      {/* Max value of 20 */}
                      {[...Array(20).keys()].map((num) => (
                        <MenuItem key={num + 1} value={num + 1}>
                          {num + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Box for delete item button */}
                <Box display="flex" alignItems="left">
                  <IconButton
                    onClick={() => removeItem(item.itemId)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#A6B591",
                      },
                    }}
                  >
                    <DeleteIcon sx={{ color: "black" }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        <Divider sx={{ marginY: "1rem" }} />

        {/* Box for price breakdown */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={600}
            color="black"
          >
            Sub-total: <br />
            Delivery: <br />
            Total:
          </Typography>

          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={600}
            color="black"
          >
            ${calculateTotal()}.00 <br />
            $10.00 <br />${calculateTotal() + 10}.00
          </Typography>
        </Box>

        {/* Checkout button */}
        <Button
          sx={{
            marginY: "2rem",
            fontFamily: "Plus Jakarta Sans",
            fontSize: isMobile ? "12px" : "20px",
            fontWeight: 600,
            borderRadius: "12px",
            padding: isMobile ? "8px 16px " : "8px 24px",
            backgroundColor: "#f14837",
            color: "white",
            boxShadow: 1,
            "&:hover": {
              backgroundColor: "#F57D7F",
            },
          }}
        >
          Continue to Checkout
        </Button>
      </Box>
    </div>
  );
}
