import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import FloatingMenuProvider from './components/FloatingMenuProvider/FloatingMenuProvider';
import FloatingMenu from "./components/FloatingMenu/FloatingMenu";
import { AsteroidKitWrapper } from "./components/AsteroidKitWrapper/AsteroidKitWrapper";

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

/**
 * These are AsteroidKit's config only. 
 * RainbowKit's config is set in the RainbowKitProvider component as usual.
 */
const config = {
  enableSocial: false,
  enableSiwe: true,
}

/**
 * Demo theme.
 */
const myAsteroidKitTheme = {
  "blurs": {
      "modalOverlay": "blur(0px)"
  },
  "fonts": {
      "body": "SFRounded, ui-rounded, \"SF Pro Rounded\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
  },
  "radii": {
      "actionButton": "9999px",
      "connectButton": "12px",
      "menuButton": "12px",
      "modal": "24px",
      "modalMobile": "28px"
  },
  "colors": {
      "accentColor": "#3898FF",
      "accentColorForeground": "#FFF",
      "actionButtonBorder": "rgba(255, 255, 255, 0.04)",
      "actionButtonBorderMobile": "rgba(255, 255, 255, 0.08)",
      "actionButtonSecondaryBackground": "rgba(255, 255, 255, 0.08)",
      "closeButton": "rgba(224, 232, 255, 0.6)",
      "closeButtonBackground": "rgba(255, 255, 255, 0.08)",
      "connectButtonBackground": "#1A1B1F",
      "connectButtonBackgroundError": "#FF494A",
      "connectButtonInnerBackground": "linear-gradient(0deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.15))",
      "connectButtonText": "#FFF",
      "connectButtonTextError": "#FFF",
      "connectionIndicator": "#30E000",
      "downloadBottomCardBackground": "linear-gradient(126deg, rgba(0, 0, 0, 0) 9.49%, rgba(120, 120, 120, 0.2) 71.04%), #1A1B1F",
      "downloadTopCardBackground": "linear-gradient(126deg, rgba(120, 120, 120, 0.2) 9.49%, rgba(0, 0, 0, 0) 71.04%), #1A1B1F",
      "error": "#FF494A",
      "generalBorder": "rgba(255, 255, 255, 0.08)",
      "generalBorderDim": "rgba(255, 255, 255, 0.04)",
      "menuItemBackground": "rgba(224, 232, 255, 0.1)",
      "modalBackdrop": "rgba(0, 0, 0, 0.5)",
      "modalBackground": "#1A1B1F",
      "modalBorder": "rgba(255, 255, 255, 0.08)",
      "modalText": "#FFF",
      "modalTextDim": "rgba(224, 232, 255, 0.3)",
      "modalTextSecondary": "rgba(255, 255, 255, 0.6)",
      "profileAction": "rgba(224, 232, 255, 0.1)",
      "profileActionHover": "rgba(224, 232, 255, 0.2)",
      "profileForeground": "rgba(224, 232, 255, 0.05)",
      "selectedOptionBorder": "rgba(224, 232, 255, 0.1)",
      "standby": "#FFD641"
  },
  "shadows": {
      "connectButton": "0px 4px 12px rgba(0, 0, 0, 0.1)",
      "dialog": "0px 8px 32px rgba(0, 0, 0, 0.32)",
      "profileDetailsAction": "0px 2px 6px rgba(37, 41, 46, 0.04)",
      "selectedOption": "0px 2px 6px rgba(0, 0, 0, 0.24)",
      "selectedWallet": "0px 2px 6px rgba(0, 0, 0, 0.24)",
      "walletLogo": "0px 2px 16px rgba(0, 0, 0, 0.16)"
  }
}

/**
 * 1. Element should be compatible with RainbowKit:
 *  - add wagmi object
 * 2. Behaviours - hooks
 *  - expose hooks, fns from wagmi
 */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <FloatingMenuProvider>
          <AsteroidKitWrapper config={config} />
          <FloatingMenu />
        </FloatingMenuProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
