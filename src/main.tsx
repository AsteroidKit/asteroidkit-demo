import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { AsteroidKitProvider, createClient } from "asteroidkit";

import { createTheme, Theme, ThemeProvider } from "@mui/material";
import { WagmiConfig } from "wagmi";

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

const client = createClient({ appId: "YOUR_APP_ID" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <WagmiConfig client={client}>
          <AsteroidKitProvider>
            <App />
          </AsteroidKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
