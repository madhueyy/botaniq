import React, { useState } from "react";
import bg from "../assets/contact_bg.png";
import { Box, Button, TextField, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check - delete later
    console.log(formData);

    alert("Form data submitted successfully!");
    // Clear form
    setFormData({ name: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />

      {/* Box for background image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      ></Box>

      {/* Box for whole thing */}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        marginTop={"2rem"}
      >
        {/* Box for contact form */}
        <Box
          component="form"
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          sx={{
            width: "32vw",
            backgroundColor: "#f9f9f9",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
          }}
          onSubmit={handleSubmit}
        >
          <Typography
            fontFamily={"Plus Jakarta Sans"}
            fontWeight={600}
            variant="h5"
            color="black"
            sx={{ alignSelf: "center", marginBottom: "1rem" }}
          >
            Contact Us
          </Typography>

          {/* Input fields */}
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            fullWidth
          />

          {/* Box for submit button */}
          <Box display={"flex"} alignSelf={"center"}>
            <Button
              type="submit"
              sx={{
                width: "8rem",
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
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
