import { Box, Typography } from "@mui/material";
import { MaterialSymbolsStar, MaterialSymbolsStarOutline } from "./HomeItems";
import { Link } from "react-router-dom";

type ShopItemProps = {
  itemId: number;
  itemPic: string;
  itemName: string;
  itemPrice: number;
  itemReviewStars: number;
  itemReviews: number;
  itemDesc: string;
};

export default function ShopItem({
  itemId,
  itemPic,
  itemName,
  itemPrice,
  itemReviewStars,
  itemReviews,
  itemDesc,
}: ShopItemProps) {
  const filledStars = itemReviewStars;
  const nonFilledStars = 5 - itemReviewStars;
  console.log(itemPic);
  console.log(itemReviews);
  console.log(itemDesc);

  return (
    <>
      {/* Link to each shop item using itemId */}
      <Link to={`/shop/item/${itemId}`}>
        {/* Box for whole shop item */}
        <Box
          width={150}
          sx={{
            cursor: "pointer",
          }}
        >
          {/* Box for image */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              position: "relative",
              "&:hover .overlay": {
                opacity: 1,
              },
            }}
          >
            <img
              src={itemPic}
              alt="Item"
              style={{
                borderRadius: "12px",
                boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)",
              }}
            ></img>

            {/* Box for hover overlay see details text */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0,
                transition: "opacity 0.3s ease-in-out",
                borderRadius: "12px",
                zIndex: 2,
              }}
            >
              <Typography
                fontFamily={"Plus Jakarta Sans"}
                fontWeight={600}
                fontSize={16}
                sx={{ color: "white" }}
              >
                See Details
              </Typography>
            </Box>
          </Box>

          {/* Item name */}
          <Typography
            fontFamily={"Playfair Display"}
            fontWeight={700}
            variant="h6"
            color="#3B7D56"
          >
            {itemName}
          </Typography>

          {/* Item price */}
          <Typography
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={600}
            fontSize={16}
            sx={{ color: "black" }}
          >
            ${itemPrice}.00
          </Typography>

          {/* Box for item review stars */}
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
          </Box>
        </Box>
      </Link>
    </>
  );
}
