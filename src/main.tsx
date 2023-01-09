import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { AsteroidKitProvider } from "asteroidkit";
import { createTheme, Theme, ThemeProvider } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#B183ED",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "filled",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
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
