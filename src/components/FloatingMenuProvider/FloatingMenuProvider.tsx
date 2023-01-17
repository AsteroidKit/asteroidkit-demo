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

const { chains, provider, webSocketProvider } = configureChains(
    [
      mainnet,
      polygon,
      optimism,
      arbitrum
    ],
    [
      alchemyProvider({
        // This is Alchemy's default API key.
        // You can get your own at https://dashboard.alchemyapi.io
        apiKey: 'pZeNwDzPr46JgI5oGyuEoobufgMp2Co0',
      }),
      publicProvider(),
    ]
);

const walletsDemo = [
  { "name": "metamask", enabled: true, connector: metaMaskWallet({ chains }) },
  { "name": "coinbase", enabled: true, connector: coinbaseWallet({ appName: "AsteroidKit Demo", chains }) },
  { "name": "ledger", enabled: true, connector: ledgerWallet({ chains }) },
  { "name": "argent", enabled: false, connector: argentWallet({ chains }) }
]

function useFloatingMenuStateValue() {
    const [color, setColor] = useState('light');
    const [connectors, setConnectors] = useState(null);
    const [siwe, setSiwe] = useState(false);
    const [social, setSocial] = useState(false);
    const [wallets, setWallets] = useState(walletsDemo);
    const [visible, setVisible] = useState(false);
    
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
        setSiwe: (siwe: boolean) => setSiwe(siwe),
        social,
        setSocial: (social: boolean) => {
          let _connectors;

          const wallets = [{
            groupName: 'Recommended',
            wallets: [
              metaMaskWallet({ chains }),
              rainbowWallet({ chains }),
              coinbaseWallet({ appName: "AsteroidKit Demo", chains }),
              walletConnectWallet({ chains }),
            ],
          }];

          if( social ) {
            wallets.push({
              groupName: 'Social',
              wallets: [
                injectedWallet({ chains }),
                rainbowWallet({ chains }),
                walletConnectWallet({ chains }),
              ],
            })
          }

          _connectors = connectorsForWallets(wallets);

          setConnectors(_connectors as any)
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

