import { TryRounded } from "@mui/icons-material";
import { create } from "@mui/material/styles/createTransitions";
import { AsteroidKitProvider, createClient } from "asteroidkit";
import { useEffect, useMemo } from "react";
import { configureChains } from "wagmi";
import { polygon, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import App from "../../App";
import { useFloatingMenuState } from "../FloatingMenuProvider/FloatingMenuProvider";
import { WagmiConfig } from "wagmi";

type AsteroidKitWrapperProps = {
  config: any;
};

const getDemoTheme = (name: string) => {
  const darkTheme = {
    blurs: {
      modalOverlay: "blur(0px)",
    },
    fonts: {
      body: 'SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    radii: {
      actionButton: "9999px",
      connectButton: "12px",
      menuButton: "12px",
      modal: "24px",
      modalMobile: "28px",
    },
    colors: {
      accentColor: "#3898FF",
      accentColorForeground: "#FFF",
      actionButtonBorder: "rgba(255, 255, 255, 0.04)",
      actionButtonBorderMobile: "rgba(255, 255, 255, 0.08)",
      actionButtonSecondaryBackground: "rgba(255, 255, 255, 0.08)",
      closeButton: "rgba(224, 232, 255, 0.6)",
      closeButtonBackground: "rgba(255, 255, 255, 0.08)",
      connectButtonBackground: "#1A1B1F",
      connectButtonBackgroundError: "#FF494A",
      connectButtonInnerBackground:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.15))",
      connectButtonText: "#FFF",
      connectButtonTextError: "#FFF",
      connectionIndicator: "#30E000",
      downloadBottomCardBackground:
        "linear-gradient(126deg, rgba(0, 0, 0, 0) 9.49%, rgba(120, 120, 120, 0.2) 71.04%), #1A1B1F",
      downloadTopCardBackground:
        "linear-gradient(126deg, rgba(120, 120, 120, 0.2) 9.49%, rgba(0, 0, 0, 0) 71.04%), #1A1B1F",
      error: "#FF494A",
      generalBorder: "rgba(255, 255, 255, 0.08)",
      generalBorderDim: "rgba(255, 255, 255, 0.04)",
      menuItemBackground: "rgba(224, 232, 255, 0.1)",
      modalBackdrop: "rgba(0, 0, 0, 0.5)",
      modalBackground: "#1A1B1F",
      modalBorder: "rgba(255, 255, 255, 0.08)",
      modalText: "#FFF",
      modalTextDim: "rgba(224, 232, 255, 0.3)",
      modalTextSecondary: "rgba(255, 255, 255, 0.6)",
      profileAction: "rgba(224, 232, 255, 0.1)",
      profileActionHover: "rgba(224, 232, 255, 0.2)",
      profileForeground: "rgba(224, 232, 255, 0.05)",
      selectedOptionBorder: "rgba(224, 232, 255, 0.1)",
      standby: "#FFD641",
    },
    shadows: {
      connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
      profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
      selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
      selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.24)",
      walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
    },
  };

  const lightTheme = {
    blurs: {
      modalOverlay: "blur(0px)",
    },
    fonts: {
      body: 'SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    radii: {
      actionButton: "9999px",
      connectButton: "12px",
      menuButton: "12px",
      modal: "24px",
      modalMobile: "28px",
    },
    colors: {
      accentColor: "#0E76FD",
      accentColorForeground: "#FFF",
      actionButtonBorder: "rgba(0, 0, 0, 0.04)",
      actionButtonBorderMobile: "rgba(0, 0, 0, 0.06)",
      actionButtonSecondaryBackground: "rgba(0, 0, 0, 0.06)",
      closeButton: "rgba(60, 66, 66, 0.8)",
      closeButtonBackground: "rgba(0, 0, 0, 0.06)",
      connectButtonBackground: "#FFF",
      connectButtonBackgroundError: "#FF494A",
      connectButtonInnerBackground:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))",
      connectButtonText: "#25292E",
      connectButtonTextError: "#FFF",
      connectionIndicator: "#30E000",
      downloadBottomCardBackground:
        "linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF",
      downloadTopCardBackground:
        "linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF",
      error: "#FF494A",
      generalBorder: "rgba(0, 0, 0, 0.06)",
      generalBorderDim: "rgba(0, 0, 0, 0.03)",
      menuItemBackground: "rgba(60, 66, 66, 0.1)",
      modalBackdrop: "rgba(0, 0, 0, 0.3)",
      modalBackground: "#FFF",
      modalBorder: "transparent",
      modalText: "#25292E",
      modalTextDim: "rgba(60, 66, 66, 0.3)",
      modalTextSecondary: "rgba(60, 66, 66, 0.6)",
      profileAction: "#FFF",
      profileActionHover: "rgba(255, 255, 255, 0.5)",
      profileForeground: "rgba(60, 66, 66, 0.06)",
      selectedOptionBorder: "rgba(60, 66, 66, 0.1)",
      standby: "#FFD641",
    },
    shadows: {
      connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
      profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
      selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
      selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
      walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
    },
  };

  const everforest = {
    blurs: {
      modalOverlay: "blur(50px)",
    },
    fonts: {
      body: 'SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    radii: {
      actionButton: "9999px",
      connectButton: "12px",
      menuButton: "12px",
      modal: "25px",
      modalMobile: "28px",
    },
    colors: {
      accentColor: "#F5F7F8",
      accentColorForeground: "#2F383E",
      actionButtonBorder: "rgba(0, 0, 0, 0.04)",
      actionButtonBorderMobile: "rgba(0, 0, 0, 0.06)",
      actionButtonSecondaryBackground: "rgba(0, 0, 0, 0.06)",
      closeButton: "#575757",
      closeButtonBackground: "#D3D6D8",
      connectButtonBackground: "#2F383E",
      connectButtonBackgroundError: "#FF494A",
      connectButtonInnerBackground:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))",
      connectButtonText: "#25292E",
      connectButtonTextError: "#FFF",
      connectionIndicator: "#30E000",
      downloadBottomCardBackground:
        "linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF",
      downloadTopCardBackground:
        "linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF",
      error: "#FF494A",
      generalBorder: "#404C51",
      generalBorderDim: "red",
      menuItemBackground: "#404C51",
      modalBackdrop: "rgba(0, 0, 0, 0.3)",
      modalBackground: "#2F383E",
      modalBorder: "transparent",
      modalText: "#FFFFFF",
      modalTextDim: "rgba(60, 66, 66, 0.3)",
      modalTextSecondary: "rgba(255,255, 255, 0.6)",
      profileAction: "#FFF",
      profileActionHover: "rgba(255, 255, 255, 0.5)",
      profileForeground: "rgba(60, 66, 66, 0.06)",
      selectedOptionBorder: "rgba(60, 66, 66, 0.1)",
      standby: "#FFD641",
    },
    shadows: {
      connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
      profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
      selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
      selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
      walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)",
    },
  };

  if (name === "dark") return darkTheme;
  if (name === "everforest") return everforest;
  return lightTheme;
};

const handleVisibiliyWallets = (wallets: any) => {
    const el_metamask = document.querySelector('[data-testid="rk-wallet-option-metaMask"]');
    const el_coinbase = document.querySelector('[data-testid="rk-wallet-option-coinbase"]');
    const el_argent = document.querySelector('[data-testid="rk-wallet-option-argent"]');
    const el_ledger = document.querySelector('[data-testid="rk-wallet-option-ledger"]');

    const elements = {
        'metamask': el_metamask,
        'coinbase': el_coinbase,
        'argent': el_argent,
        'ledger': el_ledger,
    } as any

    for (let i = 0; i < wallets.length; i++) {
        const wallet = wallets[i];

        if(!elements[wallet.name]) continue;

        if(wallet.enabled) {
            elements[wallet.name].style.display = "block";
        } else {
            elements[wallet.name].style.display = "none";
        }
    }
}

const handleVisibiliySocial = (social: boolean) => {
    let el_social = document.querySelector('[data-testid="rk-wallet-option-openlogin_google"]')?.parentElement?.parentElement;
    let sibling = el_social?.previousSibling as HTMLElement;

    if(!el_social) return null;

    if(social) {
        sibling.style.display = "block";
        el_social.style.display = "block";
    } else {
        sibling.style.display = "none";
        el_social.style.display = "none";
    }
}

let global_social: boolean = false;
let global_wallets: [];

function handleFloatingMenu() {
    let el = document.getElementById("rk_connect_title") as HTMLElement;
    let floatingMenu = document.getElementById("floatingMenu") as HTMLElement;
    
    if(el) {
        floatingMenu.style.display = "block";
    } else {
        floatingMenu.style.display = "none";
    }
}


setInterval(() => {
    handleVisibiliySocial(global_social);
    handleVisibiliyWallets(global_wallets);
    handleFloatingMenu();
}, 100);

export const AsteroidKitWrapper = ({ config }: AsteroidKitWrapperProps) => {
  const { color, siwe, wallets, social } = useFloatingMenuState();

  useEffect(() => {
      global_social = social;
      global_wallets = wallets;
  }, [social, wallets])

  const client = useMemo(() => {
      return createClient({ 
          appId: "YOUR_APP_ID", 
          social: true,
          wallets: wallets,
      })
  }, []);

  return (
    <WagmiConfig client={client}>
        <AsteroidKitProvider 
            config={{
                enableSiwe: siwe,
                enableSocial: social
            }} 
            theme={getDemoTheme(color)} 
            modalSize="compact">
            <App />
        </AsteroidKitProvider>
    </WagmiConfig>
  ) 
}
