import React from "react";
import ReactDOM from "react-dom/client";
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
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AsteroidKitProvider>
        <App />
      </AsteroidKitProvider>
    </ThemeProvider>
  </React.StrictMode>
);
