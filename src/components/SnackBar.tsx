import { Button, Snackbar, SnackbarContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SnackBarProps {
  snackbarOpen: boolean;
  handleClose: () => void;
}

export default function SnackBar({ snackbarOpen, handleClose }: SnackBarProps) {
  // Hook for navigation
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          message="Added to Cart"
          sx={{
            color: "black",
            backgroundColor: "white",
            fontFamily: "Plus Jakarta Sans",
          }}
          action={
            <>
              <Button
                size="small"
                onClick={handleCheckout}
                sx={{
                  color: "#3B7D56",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: "600",
                }}
              >
                Checkout Now
              </Button>
            </>
          }
        />
      </Snackbar>
    </>
  );
}
