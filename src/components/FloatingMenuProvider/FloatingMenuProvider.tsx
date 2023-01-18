import { connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { ReactNode, useContext, useMemo, useState } from "react";
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { FloatingMenuContext } from "./FloatingMenuContext";
import {
    coinbaseWallet,
    injectedWallet,
    metaMaskWallet,
    rainbowWallet,
    walletConnectWallet,
    ledgerWallet,
    argentWallet,
  } from '@rainbow-me/rainbowkit/wallets';

type Props = {
    children: ReactNode;
};

const walletsDemo = [
  { "name": "metamask", enabled: true },
  { "name": "coinbase", enabled: true },
  { "name": "ledger", enabled: true },
  { "name": "argent", enabled: false }
]

function useFloatingMenuStateValue() {
    const [color, setColor] = useState('light');
    const [connectors, setConnectors] = useState(null);
    const [siwe, setSiwe] = useState(false);
    const [social, setSocial] = useState(false);
    const [wallets, setWallets] = useState(walletsDemo);
    const [visible, setVisible] = useState(true);
    
    return { 
        updateColor: (color: string) => setColor(color),
        color,
        connectors,
        updateConnectors: (name: string) => {
          const _wallets = wallets.map(wallet => {
            if( wallet.name === name ) {
              wallet.enabled = !wallet.enabled;
            }
            return wallet;
          });

          setWallets(_wallets);
        },
        siwe,
        setSiwe: (siwe: boolean) => {
          setSiwe(siwe)
        },
        social,
        setSocial: (social: boolean) => {
          setSocial(social);
        },
        wallets,
        visible,
        setVisible,
    };
}

export default function FloatingMenuProvider({ children }: Props) {
    const { color, updateColor, connectors, updateConnectors, siwe, setSiwe, social, setSocial, wallets, visible, setVisible } = useFloatingMenuStateValue();

    return (
        <FloatingMenuContext.Provider value={useMemo(
            () => ({ 
                    color, 
                    updateColor,
                    connectors,
                    updateConnectors,
                    siwe,
                    setSiwe,
                    social,
                    setSocial,
                    wallets,
                    visible,
                    setVisible
                }),
                [
                    color, 
                    updateColor,
                    connectors,
                    updateConnectors,
                    siwe,
                    setSiwe,
                    social,
                    setSocial,
                    wallets,
                    visible,
                    setVisible
                ]
            )}>
            {children}
        </FloatingMenuContext.Provider>
    );
}

export function useFloatingMenuState() {
    const { color, updateColor, connectors, updateConnectors, siwe, setSiwe, social, setSocial, wallets, visible, setVisible } =
      useContext(FloatingMenuContext);
  
    return { color, updateColor, connectors, updateConnectors, siwe, setSiwe, social, setSocial, wallets, visible, setVisible };
}

export function useColor() {
    const { updateColor } =
      useContext(FloatingMenuContext);
  
    return updateColor;
}

