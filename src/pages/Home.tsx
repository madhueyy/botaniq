import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import greenCircle from "../assets/radial_gradient.png";
import { Box, IconButton, Typography } from "@mui/material";
import type { SVGProps } from "react";
import plant from "../assets/plant_home.png";
import plant2 from "../assets/plant_home_2.png";
import HomeItems from "../components/HomeItems";
import item1 from "../assets/image 1.png";
import item2 from "../assets/image 2.png";
import HomeItems2 from "../components/HomeItems2";
import "./Home.css";

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const homeItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleScrollToHomeItems = () => {
    if (homeItemsRef.current) {
      homeItemsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* Box for hero section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Box for the two plants that fade up */}
        <Box sx={{ position: "relative", width: "50%" }}>
          <img
            src={plant2}
            // Fade up animation
            className={`fade-up fade-up-background ${
              fadeIn ? "fade-up-background" : ""
            }`}
            style={{
              position: "absolute",
              top: "0%",
              left: "20%",
              zIndex: 1,
              borderRadius: "24px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          ></img>
          <img
            src={plant}
            // Fade up animation
            className={`fade-up fade-up-foreground ${
              fadeIn ? "fade-up-foreground" : ""
            }`}
            style={{
              position: "absolute",
              top: "20%",
              left: "40%",
              zIndex: 2,
              borderRadius: "24px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          ></img>
        </Box>

        {/* Box for rhs of hero */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <TablerPlant2 // Fade up animation
            className={`fade-up fade-up-background ${
              fadeIn ? "fade-up-background" : ""
            }`}
            style={{ color: "#3B7D56", marginBottom: "-3rem" }}
          />

          {/* Website name */}
          <Typography
            // Fade up animation
            className={`fade-up fade-up-foreground ${
              fadeIn ? "fade-up-foreground" : ""
            }`}
            fontFamily={"Playfair Display"}
            color="black"
            fontWeight={600}
            fontSize={"8rem"}
          >
            BOTANIQ
          </Typography>

          {/* Website motto */}
          <Typography
            // Fade up animation
            className={`fade-up fade-up-foreground ${
              fadeIn ? "fade-up-foreground" : ""
            }`}
            fontFamily={"Playfair Display"}
            fontWeight={500}
            fontSize={"2rem"}
            textAlign={"center"}
            color="black"
          >
            Bringing <span style={{ color: "#3B7D56" }}>nature</span> to <br />
            your <span style={{ color: "#3B7D56" }}>doorstep</span>
          </Typography>
        </Box>
      </Box>

      {/* Box for scroll to featured items text + arrow */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          fontFamily={"Plus Jakarta Sans"}
          fontWeight={500}
          fontSize={"1rem"}
          textAlign={"center"}
          color="black"
        >
          Featured Items
        </Typography>

        <IconButton
          sx={{
            color: "#3B7D56",
          }}
          onClick={handleScrollToHomeItems}
        >
          <IonArrowDownOutline />
        </IconButton>
      </Box>

      {/* Box for item components */}
      <Box
        sx={{ paddingTop: "4rem", paddingBottom: "8rem" }}
        ref={homeItemsRef}
      >
        <HomeItems
          itemPic={item1}
          itemName="Monstera Deliciosa (Faux)"
          itemPrice={20.0}
          itemReviewStars={4}
          itemReviews={36}
          itemDesc="Offers the beauty of the iconic Swiss Cheese Plant without the need for maintenance. With its realistic, glossy leaves and intricate detailing, this artificial plant brings a tropical, vibrant feel to your home year-round. Perfect for adding greenery to any space, it requires no watering or upkeep."
        />
        <HomeItems2
          itemPic={item2}
          itemName="Monstera Deliciosa"
          itemPrice={35.0}
          itemReviewStars={5}
          itemReviews={52}
          itemDesc="Often called the 'Swiss Cheese Plant,' this is a striking tropical plant known for its large, glossy, fenestrated leaves. This popular houseplant adds an exotic touch to any space with its bold, statement-making foliage. Easy to care for, Monstera thrives in indirect light and brings a lush, jungle vibe to your home."
        />
      </Box>
    </>
  );
}

export function TablerPlant2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12em"
      height="12em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <path d="M2 9a10 10 0 1 0 20 0"></path>
        <path d="M12 19A10 10 0 0 1 22 9M2 9a10 10 0 0 1 10 10"></path>
        <path d="M12 4a9.7 9.7 0 0 1 2.99 7.5m-5.98 0A9.7 9.7 0 0 1 12 4"></path>
      </g>
    </svg>
  );
}

export function IonArrowDownOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        d="m112 268l144 144l144-144M256 392V100"
      ></path>
    </svg>
  );
}
