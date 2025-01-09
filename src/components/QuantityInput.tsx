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
  100: "#f14837",
  200: "#f14837",
  300: "#f14837",
  400: "#f14837",
  500: "#f14837",
  600: "#f14837",
  700: "#f14837",
  800: "#f14837",
};

const green = {
  50: "#F57D7F",
  100: "#F57D7F",
  200: "#F57D7F",
  300: "#F57D7F",
  400: "#F57D7F",
  500: "#F57D7F",
  600: "#F57D7F",
  700: "#F57D7F",
  800: "#F57D7F",
  900: "#F57D7F",
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
