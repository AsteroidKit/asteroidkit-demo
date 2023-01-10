import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { AsteroidKitProvider } from "asteroidkit";
import { createTheme, Theme, ThemeProvider } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#B183ED",
    },
    secondary: {
      main: "#4fadd6",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AsteroidKitProvider>
          <App />
        </AsteroidKitProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
