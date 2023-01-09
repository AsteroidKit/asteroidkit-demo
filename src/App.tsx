import "./App.css";

import {
  AppBar,
  Box,
  Button,
  keyframes,
  Toolbar,
  Typography,
} from "@mui/material";
import { rainbowkit, wagmi } from "asteroidkit";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AsteroidIcon from "./assets/asteroid.svg";
import { SignMessagePage } from "./pages/SignMessagePage";
import { UseAccountPage } from "./pages/useAccountPage";
import { UseBalancePage } from "./pages/useBalancePage";
import { UseBlockNumberPage } from "./pages/UseBlockNumberPage";
import { UseContractReadPage } from "./pages/UseContractReadPage";
import { UseDisconnectPage } from "./pages/UseDisconnectPage";
import { UseOpenAccountModal } from "./pages/UseOpenAccountModalPage";
import { UseOpenChainModal } from "./pages/UseOpenChainModalPage";
import { UseOpenConnectModal } from "./pages/UseOpenConnectModalPage";
import { UseSwitchNetwork } from "./pages/UseSwitchNetwork";
import { UseTransaction } from "./pages/UseTransaction";
import { WelcomePage } from "./pages/WelcomePage";

const upAndDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-18px);
  }
`;

const navList = [
  { path: "useSignMessage", component: <SignMessagePage /> },
  { path: "useAccount", component: <UseAccountPage /> },
  { path: "useBalance", component: <UseBalancePage /> },
  { path: "useBlockNumber", component: <UseBlockNumberPage /> },
  { path: "useDisconnect", component: <UseDisconnectPage /> },
  { path: "useContractReadPage", component: <UseContractReadPage /> },
  { path: "useSwitchNetwork", component: <UseSwitchNetwork /> },
  { path: "useTransaction", component: <UseTransaction /> },
  { path: "useConnectModal", component: <UseOpenConnectModal /> },
  { path: "useAccountModal", component: <UseOpenAccountModal /> },
  { path: "useChainModal", component: <UseOpenChainModal /> },
];

function App() {
  const { address, isConnected, isDisconnected } = wagmi.useAccount();
  const { pathname } = useLocation();

  return (
    <Box
      width="100vw"
      height="100vh"
      overflow="hidden"
      display="flex"
      flexDirection={"column"}
    >
      <AppBar
        sx={{
          background:
            "linear-gradient(148deg, rgba(191,112,238,1) 0%, rgba(103,206,236,1) 100%)",
        }}
        position="relative"
      >
        <Toolbar>
          <img src={AsteroidIcon} alt="AsteroidKit icon" height={30} />
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: "4px", color: "white" }}
          >
            AsteroidKit
          </Typography>
          <Box position="relative">
            <rainbowkit.ConnectButton />
            {isDisconnected && (
              <ArrowUpwardIcon
                fontSize="large"
                sx={{
                  position: "absolute",
                  right: "calc(50% - 20px)",
                  top: "calc(100% + 30px)",
                  animation: `${upAndDown} 0.5s infinite alternate`,
                }}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box flexGrow={1} display="flex" flexShrink={0}>
        {isConnected && (
          <Box
            width="150px"
            minWidth={150}
            sx={{
              bgcolor: "#bc74ee78",
            }}
            boxShadow="0px 3px 14px 9px rgba(0, 0, 0, 0.2)"
            padding="64px 12px"
            display="flex"
            alignItems={"middle"}
            flexDirection={"column"}
            gap={1}
          >
            {navList.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={`./${item.path}`}
                disabled={pathname === `/${item.path}`}
                size="small"
                variant="text"
                sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
              >
                {item.path}
              </Button>
            ))}
          </Box>
        )}
        <Box
          padding={4}
          color="white"
          display="flex"
          maxHeight={"calc(100vh - 130px)"}
          overflow="hidden auto"
          width="100%"
          maxWidth={"calc(100% - 150px"}
          justifyContent="center"
        >
          <Routes>
            <Route index element={<WelcomePage />} />
            {navList.map((item) => (
              <Route path={`/${item.path}`} element={item.component} />
            ))}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
