import "./App.css";

import {
  AppBar,
  Box,
  Button,
  keyframes,
  Link as MuiLink,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ConnectButton } from "asteroidkit";
import { useAccount } from "wagmi";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Link as ReactRouterLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

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
import { ProtectedRoute } from "./ProtectedRoute";
import { useEffect, useState } from "react";
import { useFloatingMenuState } from "./components/FloatingMenuProvider/FloatingMenuProvider";

const upAndDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-18px);
  }
`;

const navListWagmi = [
  {
    path: "useSignMessage",
    component: <SignMessagePage />,
  },
  { path: "useAccount", component: <UseAccountPage /> },
  { path: "useBalance", component: <UseBalancePage /> },
  { path: "useBlockNumber", component: <UseBlockNumberPage /> },
  { path: "useDisconnect", component: <UseDisconnectPage /> },
  { path: "useContractReadPage", component: <UseContractReadPage /> },
  { path: "useSwitchNetwork", component: <UseSwitchNetwork /> },
  { path: "useTransaction", component: <UseTransaction /> },
];

const navListRainbowkit = [
  // { path: "useConnectModal", component: <UseOpenConnectModal /> },
  { path: "useAccountModal", component: <UseOpenAccountModal /> },
  { path: "useChainModal", component: <UseOpenChainModal /> },
];

function App() {
  const { address, isConnected, isDisconnected } = useAccount();
  const { pathname } = useLocation();
  const theme = useTheme();
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { visible, setVisible } = useFloatingMenuState();

  const location = useLocation();

  useEffect(() => {
    if (isSmallScreen) {
      setIsMenuVisible(false);
    }
  }, [location]);

  useEffect(() => {
    if (!isSmallScreen) {
      setIsMenuVisible(true);
    }
  }, [isSmallScreen]);

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
            "linear-gradient(148deg, rgba(191,112,238,1) 0%, #298cab 100%)",
        }}
        position="relative"
      >
        <Toolbar sx={{ zIndex: 200 }}>
          <Box display="flex" flexGrow={1} alignItems="center">
            {isSmallScreen && (
              <Button
                sx={{ marginRight: "4px" }}
                size="small"
                variant="contained"
                onClick={() => {
                  setIsMenuVisible((old) => !old);
                }}
              >
                <MenuIcon />
              </Button>
            )}
            <MuiLink href="https://www.asteroidkit.com/" underline="none">
              <Box display="flex" alignItems="center">
                <img src={AsteroidIcon} alt="AsteroidKit icon" height={30} />

                {!isSmallScreen && (
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, paddingLeft: "4px", color: "white" }}
                  >
                    AsteroidKit
                  </Typography>
                )}
              </Box>
            </MuiLink>
          </Box>
          <Box position="relative">
            <ConnectButton />
            {!isConnected && (
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
      <Box flexGrow={1} display="flex" flexShrink={0} position="relative">
        {isConnected && (
          <Box
            position={isSmallScreen ? "absolute" : "relative"}
            zIndex={100}
            bottom={0}
            top={0}
            sx={{
              background: "#343236",
              transition: "opacity 195ms cubic-bezier(0.4, 0, 0.2, 1)",
              opacity: isMenuVisible ? 1 : 0,
              pointerEvents: isMenuVisible ? "auto" : "none",
            }}
            width="150px"
            minWidth={150}
            boxShadow="0px 3px 14px 9px rgba(0, 0, 0, 0.2)"
            padding="64px 12px"
            display="flex"
            alignItems={"middle"}
            flexDirection={"column"}
            gap={1}
          >
            <Typography
              color="#b4b4b4"
              textAlign="center"
              sx={{
                fontSize: "14px",
                padding: "8px",
                fontWeight: "300",
                borderBottom: "0.5px solid #9b9b9b",
                margin: "0 -12px",
              }}
            >
              Wagmi Hooks
            </Typography>
            {navListWagmi.map((item) => (
              <Button
                key={item.path}
                component={ReactRouterLink}
                to={`./${item.path}`}
                disabled={pathname === `/${item.path}`}
                size="small"
                variant="text"
                sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
              >
                {item.path}
              </Button>
            ))}
            <Typography
              color="#b4b4b4"
              textAlign="center"
              sx={{
                fontSize: "14px",
                padding: "8px",
                fontWeight: "300",
                borderBottom: "0.5px solid #9b9b9b",
                marginLeft: "-12px",
                marginTop: 3,
                marginRight: "-12px",
              }}
            >
              Rainbowkit Hooks
            </Typography>

            {navListRainbowkit.map((item) => (
              <Button
                key={item.path}
                component={ReactRouterLink}
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
          position="absolute"
          width="100%"
          height="100%"
          sx={{
            bgcolor: "#000000b1",
            zIndex: 50,
            transition: "opacity 195ms cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: isSmallScreen && isMenuVisible ? 1 : 0,
            pointerEvents: isSmallScreen && isMenuVisible ? "auto" : "none",
          }}
          onClick={() => setIsMenuVisible(false)}
        />

        <Box
          padding={4}
          position="relative"
          color="white"
          display="flex"
          maxHeight={"calc(100vh - 130px)"}
          overflow="hidden auto"
          width="100%"
        >
          <Routes>
            <Route index element={<WelcomePage />} />
            {navListWagmi.map((item) => (
              <Route
                key={item.path}
                path={`/${item.path}`}
                element={<ProtectedRoute>{item.component}</ProtectedRoute>}
              />
            ))}
            {navListRainbowkit.map((item) => (
              <Route
                key={item.path}
                path={`/${item.path}`}
                element={<ProtectedRoute>{item.component}</ProtectedRoute>}
              />
            ))}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
