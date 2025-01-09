import { useState, useEffect } from "react";
import { Stack, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import icon from "../../public/plant-icon.svg";
import "./StepsScroll.css";

export default function StepsScroll() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const circles = document.querySelectorAll(".circle");
      circles.forEach((circle, index) => {
        const rect = circle.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.top <= window.innerHeight / 1.5;
        if (isVisible) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const steps = [
    {
      icon: (
        <SearchIcon
          className={`icon ${activeStep === 0 ? "active-step" : ""}`}
          fontSize="small"
        />
      ),
      title: "Explore the Collection",
      description:
        "Browse through our diverse range of indoor plants curated for every space and style.",
    },
    {
      icon: (
        <AddShoppingCartIcon
          className={`icon ${activeStep === 1 ? "active-step" : ""}`}
          fontSize="small"
        />
      ),
      title: "Select your Favourites",
      description:
        "Choose the plants you love and add them to your cart with just a click.",
    },
    {
      icon: (
        <PaymentIcon
          className={`icon ${activeStep === 2 ? "active-step" : ""}`}
          fontSize="small"
        />
      ),
      title: "Place your Order",
      description:
        "Checkout securely and easily with multiple payment options available.",
    },
    {
      icon: (
        <LocalShippingIcon
          className={`icon ${activeStep === 3 ? "active-step" : ""}`}
          fontSize="small"
        />
      ),
      title: "Enjoy Hassle-Free Delivery",
      description:
        "Sit back and relax as we deliver your plants fresh and safe to your doorstep.",
    },
    {
      icon: (
        <img
          src={icon}
          alt="Plant Icon"
          className={`icon ${activeStep === 4 ? "active-step" : ""}`}
        />
      ),
      title: "Enjoy Your Plants",
      description: "Care for and enjoy your new plants in your space.",
    },
  ];

  return (
    <>
      <Stack gap={30} paddingInline={20} className="steps-container">
        {steps.map((step, index) => (
          <Box key={index} className="step-item">
            <Typography
              className={`step-title ${
                activeStep === index ? "active-step" : ""
              }`}
              fontFamily="Playfair Display"
              mr={6}
              variant="h3"
              textAlign="right"
              flex={1}
              color="black"
            >
              {step.title}
            </Typography>
            <div className={`circle ${activeStep === index ? "active" : ""}`}>
              {step.icon}
            </div>
            <Typography
              className={`step-desc ${
                activeStep === index ? "active-step" : ""
              }`}
              fontFamily="Plus Jakarta Sans"
              variant="body1"
              ml={6}
              flex={1}
              color="white"
              fontSize="1.2rem"
            >
              {step.description}
            </Typography>
          </Box>
        ))}
      </Stack>

      <div className="vertical-line"></div>
    </>
  );
}
