import { useRef } from "react";
import Navbar from "../components/Navbar";
import { Box, IconButton, Typography } from "@mui/material";
import type { SVGProps } from "react";
import plant from "../assets/plant_1.png";
import plant2 from "../assets/plant_2.png";
import plant3 from "../assets/plant_3.png";
import plant4 from "../assets/plant_4.png";
import plant5 from "../assets/plant_5.png";
import plant6 from "../assets/plant_6.png";
import HomeItems from "../components/HomeItems";
import item1 from "../assets/image 1.png";
import item2 from "../assets/image 2.png";
import HomeItems2 from "../components/HomeItems2";
import "./Home.css";

export default function Home() {
  const homeItemsRef = useRef<HTMLDivElement>(null);

  const handleScrollToHomeItems = () => {
    if (homeItemsRef.current) {
      homeItemsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

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
        {/* Box for plants on lhs */}
        <Box sx={{ position: "relative", width: "20%" }}>
          <img
            src={plant}
            className="spin-up-1"
            style={{
              position: "absolute",
              bottom: "80%",
              left: "30%",
              width: "180px",
              zIndex: 1,
            }}
          ></img>
          <img
            src={plant2}
            className="spin-up-2"
            style={{
              position: "absolute",
              top: "20%",
              right: "55%",
              zIndex: 1,
            }}
          ></img>
          <img
            src={plant3}
            className="spin-up-3"
            style={{
              position: "absolute",
              top: "70%",
              left: "50%",
              zIndex: 1,
              width: "170px",
            }}
          ></img>
        </Box>

        {/* Box for middle of hero */}
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <TablerPlant2 // Fade up animation
            className="fade-up"
            style={{ color: "#f14837", marginBottom: "-70px" }}
          />

          {/* Website name */}
          <Typography
            // Fade up animation
            className="fade-up"
            fontFamily={"Playfair Display"}
            color="white"
            fontWeight={600}
            fontSize={"8rem"}
          >
            BOTANIQ
          </Typography>

          {/* Website motto */}
          <Typography
            // Fade up animation
            className="fade-up"
            fontFamily={"Playfair Display"}
            fontWeight={500}
            fontSize={"2rem"}
            textAlign={"center"}
            color="white"
            mt="-30px"
          >
            bringing <span style={{ color: "white" }}>nature</span> to <br />
            your <span style={{ color: "white" }}>doorstep.</span>
          </Typography>
        </Box>

        {/* Box for plants on rhs */}
        <Box sx={{ position: "relative", width: "20%" }}>
          <img
            src={plant4}
            className="spin-up-4"
            style={{
              position: "absolute",
              bottom: "110%",
              left: "-20%",
              zIndex: 1,
              width: "140px",
            }}
          ></img>
          <img
            src={plant5}
            className="spin-up-5"
            style={{
              position: "absolute",
              top: "0%",
              left: "35%",
              zIndex: 1,
            }}
          ></img>
          <img
            src={plant6}
            className="spin-up-6"
            style={{
              position: "absolute",
              top: "80%",
              left: "10%",
              zIndex: 1,
              width: "150px",
            }}
          ></img>
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
          color="white"
        >
          Featured Items
        </Typography>

        <IconButton
          sx={{
            color: "white",
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
