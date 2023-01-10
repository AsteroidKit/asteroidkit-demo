import "./App.css";

import {
  AppBar,
  Box,
  Button,
  keyframes,
  Link as MuiLink,
  Toolbar,
  Typography,
} from "@mui/material";
import { rainbowkit, wagmi } from "asteroidkit";
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
            "linear-gradient(148deg, rgba(191,112,238,1) 0%, #298cab 100%)",
        }}
        position="relative"
      >
        <Toolbar>
          <Box display="flex" flexGrow={1} alignItems="center">
            <MuiLink href="https://www.asteroidkit.com/" underline="none">
              <Box display="flex" alignItems="center">
                <img src={AsteroidIcon} alt="AsteroidKit icon" height={30} />

                <Typography
                  variant="h5"
                  component="div"
                  sx={{ flexGrow: 1, paddingLeft: "4px", color: "white" }}
                >
                  AsteroidKit
                </Typography>
              </Box>
            </MuiLink>
          </Box>
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
              bgcolor: "#353236",
            }}
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
            {/* <Box paddingTop="12px"> */}
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
            {/* </Box> */}

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
