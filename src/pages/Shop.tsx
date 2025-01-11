import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ShopItem from "../components/ShopItem";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Item } from "../../backend/src/data/data";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Shop() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string>("popularity");
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:768px)");

  // Hook for navigation
  const navigate = useNavigate();

  // Function to fetch all the plants
  const fetchItems = async () => {
    try {
      const response = await fetch(
        "https://botaniq-backend.vercel.app/api/getitems"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setItems(data.items);
      console.log(items);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Run on first render
  useEffect(() => {
    setTimeout(() => {
      fetchItems();
      setLoading(false);
    }, 2000);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  // Get filtered items from search and sort-by queries
  const filteredItems = items
    // Filter with search query
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Sort by whichever option user chooses
    .sort((a, b) => {
      switch (sortOption) {
        case "priceLowToHigh":
          return a.price - b.price;
        case "priceHighToLow":
          return b.price - a.price;
        case "popularity":
          return a.itemId - b.itemId;
        case "highestReviewed":
          return b.reviewStars - a.reviewStars;
        default:
          return 0;
      }
    });

  return (
    <>
      <Navbar />

      {/* Box for back button, search bar and sort-by */}
      <Box
        display={"flex"}
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
        alignItems={isMobile ? "flex-end" : "center"}
        rowGap={1}
        sx={{ marginTop: "2rem", paddingRight: isMobile ? 0 : 6 }}
      >
        {/* Box for back button */}
        <Box
          flex={1}
          display={isMobile ? "none" : "flex"}
          justifyContent={"center"}
        >
          <Button
            onClick={handleBackClick}
            startIcon={<ArrowBackIcon />}
            sx={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: isMobile ? "10px" : "16px",
              fontWeight: 600,
              borderRadius: "4px",
              padding: isMobile ? "0px 10px" : "8px 24px",
              backgroundColor: "#f14837",
              color: "white",
              height: isMobile ? 40 : 50,
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "#F57D7F",
              },
            }}
          >
            Go back
          </Button>
        </Box>

        {/* Box for search bar */}
        <Box flex={2} display="flex" justifyContent={"center"}>
          <Paper
            sx={{
              p: isMobile ? "0px 0px" : "2px 4px",
              display: "flex",
              alignItems: "center",
              width: isMobile ? 300 : 400,
              backgroundColor: "white",
            }}
          >
            <InputBase
              sx={{
                marginLeft: 1,
                flex: 1,
                fontFamily: "Plus Jakarta Sans",
                fontSize: isMobile ? "10px" : "16px",
                fontWeight: 500,
              }}
              placeholder="Search for a plant"
              inputProps={{ "aria-label": "Search for a plant" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {/* Box for sort-by */}
        <Box>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: isMobile ? 200 : 300,
              height: isMobile ? 40 : 50,
              backgroundColor: "white",
            }}
          >
            {/* Box for sort-by icon and text */}
            <Box display="flex" alignItems="center">
              <SwapVertIcon sx={{ marginLeft: 1 }} />
              <Typography
                sx={{
                  marginLeft: 1,
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: isMobile ? "10px" : "16px",
                  fontWeight: 700,
                }}
              >
                Sort by:
              </Typography>
            </Box>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              inputProps={{ "aria-label": "Sort By" }}
              sx={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: isMobile ? "10px" : "16px",
                fontWeight: 500,
                flex: 1,
                // Removing the border to match search bar style
                border: "none",
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="priceLowToHigh">Price - Low to High</MenuItem>
              <MenuItem value="priceHighToLow">Price - High to Low</MenuItem>
              <MenuItem value="popularity">Popularity</MenuItem>
              <MenuItem value="highestReviewed">Best Reviews</MenuItem>
            </Select>
          </Paper>
        </Box>
      </Box>

      <Box>
        {loading ? (
          <Box
            sx={{
              margin: "10rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress color="error" />
            <Typography
              variant="h6"
              color="white"
              fontFamily="Plus Jakarta Sans"
            >
              Loading items...
            </Typography>
          </Box>
        ) : (
          // Box for all items
          <Box
            marginTop={4}
            paddingLeft={isMobile ? 2 : 10}
            paddingRight={isMobile ? 0 : 10}
            mb={10}
            rowGap={8}
            columnGap={4}
            display={"grid"}
            justifyItems={"center"}
            sx={{
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              },
            }}
          >
            {/* Shows all items for "" in search query,
            if after filtering with the query there are > 0 items
            found then show items, else show no items found */}
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
              <Box
                sx={{
                  marginTop: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  fontFamily={"Plus Jakarta Sans"}
                  fontWeight={700}
                  color="black"
                >
                  No matching items found
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
