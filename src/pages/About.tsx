import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import sideImage from "../assets/about_1.png";
import teamImage from "../assets/about_2.png";
import "./About.css";

export default function AboutPage() {
  return (
    <div className="bg">
      <Navbar />

      {/* Box for whole page */}
      <Box sx={{ marginLeft: "8rem", marginRight: "4rem", marginY: "2rem" }}>
        {/* Title */}
        <Typography
          fontFamily={"Playfair Display"}
          fontWeight={700}
          variant="h2"
          sx={{ color: "#3B7D56", marginBottom: "2rem" }}
        >
          About Us
        </Typography>

        {/* Box for about us details */}
        <Box display={"flex"} flexDirection={"row"}>
          <Box marginRight={"4rem"}>
            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={600}
              variant="h4"
              color="black"
              sx={{ marginBottom: "1rem" }}
            >
              Our Mission
            </Typography>
            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={500}
              fontSize={"1rem"}
              color="black"
              sx={{ marginBottom: "1rem" }}
            >
              At GreenThumb Plants, our mission is to bring the beauty of nature
              into your home with high-quality, sustainably sourced plants. We
              believe that plants not only enhance the aesthetic of your space
              but also contribute to your well-being.
            </Typography>

            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={600}
              variant="h4"
              color="black"
              sx={{ marginBottom: "1rem" }}
            >
              Our Story
            </Typography>
            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={500}
              fontSize={"1rem"}
              color="black"
              sx={{ marginBottom: "1rem" }}
            >
              Founded in 2020, GreenThumb Plants started as a small passion
              project and has grown into a beloved destination for plant
              enthusiasts. What began with a single greenhouse has evolved into
              a thriving online store with a wide range of indoor and outdoor
              plants.
            </Typography>

            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={600}
              variant="h4"
              color="black"
              sx={{ marginBottom: "1rem" }}
            >
              Meet the Team
            </Typography>
            <Typography
              fontFamily={"Plus Jakarta Sans"}
              fontWeight={500}
              fontSize={"1rem"}
              color="black"
              sx={{ marginBottom: "1rem" }}
            >
              Our dedicated team is passionate about plants and committed to
              providing you with the best shopping experience. From our expert
              horticulturists to our friendly customer service representatives,
              we're here to help you find the perfect plant for your space.
            </Typography>

            {/* Box for team image */}
            <Box sx={{ width: "35rem" }}>
              <img
                style={{
                  borderRadius: "20px",
                  boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
                }}
                src={teamImage}
              />
            </Box>
          </Box>

          {/* Box for side image */}
          <Box sx={{ width: "35rem" }}>
            <img
              style={{
                borderRadius: "20px",
                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
              }}
              src={sideImage}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
