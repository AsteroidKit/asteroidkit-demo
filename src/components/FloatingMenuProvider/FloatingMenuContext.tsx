import { createContext } from "react";

interface FloatingMenuContextValue {
    color: string;
    updateColor: (color: string) => void;
    connectors: any;
    updateConnectors: (name: string) => void;
    siwe: boolean;
    setSiwe: (siwe: boolean) => void;
    social: boolean;
    setSocial: (social: boolean) => void;
    wallets: any;
    visible: boolean,
    setVisible: (visible: boolean) => void;
  }
  
export const FloatingMenuContext = createContext<FloatingMenuContextValue>({
    color: "light",
    updateColor: () => {},
    connectors: {},
    updateConnectors: () => {},
    siwe: false,
    setSiwe: () => {},
    social: false,
    setSocial: () => {},
    wallets: {},
    setVisible: () => {},
    visible: true,
});
