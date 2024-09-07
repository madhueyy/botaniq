// Code from Material UI's number input component
// https://mui.com/base-ui/react-number-input/
// modified to track item quantity state + theme colour changes

import * as React from "react";
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import { styled } from "@mui/system";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function QuantityInput({
  quantity,
  setQuantity,
}: {
  quantity: number;
  setQuantity: (quantity: number) => void;
}) {
  const handleChange = (
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.PointerEvent<Element>
      | React.KeyboardEvent<Element>,
    value: number | null
  ) => {
    if (value !== null && value >= 1 && value <= 20) {
      event;
      setQuantity(value);
    }
  };

  return (
    <NumberInput
      aria-label="Quantity Input"
      min={1}
      max={20}
      value={quantity}
      onChange={handleChange}
    />
  );
}

const yellow = {
  100: "#FEFDFB",
  200: "#FDFCF9",
  300: "#FBF8F4",
  400: "#F1E9DA",
  500: "#D9D2C4",
  600: "#C1BAAE",
  700: "#B5AFA4",
  800: "#918C83",
};

const green = {
  50: "#F8FAF6",
  100: "#F4F7F1",
  200: "#E9EEE2",
  300: "#B8C9A1",
  400: "#A6B591",
  500: "#93A181",
  600: "#8A9779",
  700: "#6E7961",
  800: "#535A48",
  900: "#404638",
};

const StyledInputRoot = styled("div")(
  ({}) => `
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-weight: 500;
  color: black;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: black;
  background: white;
  border: 1px solid ${yellow[500]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${green[300]};
  }

  &:focus {
    border-color: ${green[700]};
    box-shadow: 0 0 4px 2px ${green[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);

const StyledButton = styled("button")(
  ({}) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border-radius: 999px;
  background: ${yellow[400]};
  color: black;
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${green[300]};
    border-color: black;
    color: black;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);
