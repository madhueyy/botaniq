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
} from "@mui/material";
import { Item } from "../../backend/src/data/data";
import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import greenCircle from "../assets/radial_gradient.png";

export default function Shop() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string>("popularity");

  // Hook for navigation
  const navigate = useNavigate();

  // Function to fetch all the plants
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getitems");

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
    fetchItems();
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

      {/* Box for green gradient circle bg */}
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <img
          src={greenCircle}
          alt="green circle bg"
          style={{
            width: "200rem",
          }}
        />
      </Box>

      {/* Box for back button, search bar and sort-by */}
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginTop: "2rem", paddingRight: 12 }}
      >
        {/* Box for back button */}
        <Box flex={1} display="flex" justifyContent={"center"}>
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

        {/* Box for search bar */}
        <Box flex={2} display="flex" justifyContent={"center"}>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              backgroundColor: "#F2F2F2",
            }}
          >
            <InputBase
              sx={{
                marginLeft: 1,
                flex: 1,
                fontFamily: "Plus Jakarta Sans",
                fontSize: "16px",
                fontWeight: 500,
              }}
              placeholder="Search for a plant"
              inputProps={{ "aria-label": "Search for a plant" }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
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
              width: 300,
              height: 50,
              backgroundColor: "#F2F2F2",
            }}
          >
            {/* Box for sort-by icon and text */}
            <Box display="flex" alignItems="center">
              <SwapVertIcon sx={{ marginLeft: 1 }} />
              <Typography
                sx={{
                  marginLeft: 1,
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: "16px",
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
                fontSize: "16px",
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

      {/* Box for all items */}
      <Box
        marginTop={4}
        paddingLeft={16}
        paddingRight={16}
        rowGap={8}
        columnGap={4}
        display={"grid"}
        gridTemplateColumns={"repeat(5, 1fr)"}
        justifyItems={"center"}
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
    </>
  );
}
