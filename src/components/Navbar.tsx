import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import type { SVGProps } from "react";

export default function Navbar() {
  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/shop", label: "SHOP" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  // Checking that current path is active,
  // including the shop/item/:itemId
  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent" }}
      elevation={0}
    >
      <Toolbar>
        {/* Box for whole bar */}
        <Box sx={{ display: "flex", flexGrow: 1, gap: "20px" }}>
          {/* Box for left side of bar */}
          <Box sx={{ color: "#3B7D56" }}>
            <TablerPlant2 />
          </Box>

          {/* Box for middle of bar */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 2,
              gap: "20px",
              marginTop: "10px",
            }}
          >
            {/* Mapping over navItems to create buttons */}
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: "black",
                  fontSize: "1.25rem",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  borderRadius: isActive(item.path) ? "12px" : "none",
                  borderWidth: "12px",
                  backgroundColor: isActive(item.path)
                    ? "#F1E9DA"
                    : "transparent",
                  boxShadow: isActive(item.path) ? 1 : 0,
                  height: isActive(item.path) ? "2.25rem" : "2.25rem",
                  padding: isActive(item.path) ? "0px 24px" : "0px 24px",
                  lineHeight: "2.25rem",
                  "&:hover": {
                    backgroundColor: isActive(item.path)
                      ? "#A6B591"
                      : "transparent",
                    color: isActive(item.path) ? "black" : "#35714D",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Checkout on rhs */}
        <Link
          to="/checkout"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <IconButton
            size="large"
            edge="end"
            sx={{
              color: "#3B7D56",
              "&:hover": {
                backgroundColor: "#A6B591",
                color: "black",
              },
            }}
          >
            <PhShoppingCartBold />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export function TablerPlant2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M2 9a10 10 0 1 0 20 0"></path>
        <path d="M12 19A10 10 0 0 1 22 9M2 9a10 10 0 0 1 10 10"></path>
        <path d="M12 4a9.7 9.7 0 0 1 2.99 7.5m-5.98 0A9.7 9.7 0 0 1 12 4"></path>
      </g>
    </svg>
  );
}

export function PhShoppingCartBold(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="currentColor"
        d="M233.21 56.31A12 12 0 0 0 224 52H66l-5.47-30.15A12 12 0 0 0 48.73 12H24a12 12 0 0 0 0 24h14.71l24.91 137a28 28 0 0 0 4.07 10.21A32 32 0 1 0 123 196h34a32 32 0 1 0 31-24H91.17a4 4 0 0 1-3.93-3.28L84.92 156H196.1a28 28 0 0 0 27.55-23l12.16-66.86a12 12 0 0 0-2.6-9.83M100 204a8 8 0 1 1-8-8a8 8 0 0 1 8 8m88 8a8 8 0 1 1 8-8a8 8 0 0 1-8 8m12-83.28a4 4 0 0 1-3.9 3.28H80.56L70.38 76h139.24Z"
      ></path>
    </svg>
  );
}
