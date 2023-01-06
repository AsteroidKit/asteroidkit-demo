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
import {
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AsteroidIcon from "./assets/asteroid.svg";
import { SignMessagePage } from "./SignMessagePage";
import { WelcomePage } from "./WelcomePage";
import { UseAccountPage } from "./useAccountPage";
import { UseBalancePage } from "./useBalancePage";
import { UseBlockNumberPage } from "./UseBlockNumberPage";
import { UseDisconnectPage } from "./UseDisconnectPage";

const upAndDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-18px);
  }
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/useSignMessage",
    element: <SignMessagePage />,
  },
  {
    path: "/useAccount",
    element: <UseAccountPage />,
  },
  {
    path: "/useBalance",
    element: <UseBalancePage />,
  },
  {
    path: "/useBlockNumber",
    element: <UseBlockNumberPage />,
  },
  {
    path: "/useDisconnect",
    element: <UseDisconnectPage />,
  },
]);

function App() {
  const { address, isConnected, isDisconnected } = wagmi.useAccount();

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
            {/* <Box sx={{ borderBottom: "1px solid white", margin: "6px 0" }} /> */}
            <Button
              component={Link}
              to="./useSignMessage"
              size="small"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useSignMessage
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useAccount"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useAccount
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useBalance"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useBalance
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useBlockNumber"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useBlocknumber
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useDisconnect"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useDisconnect
            </Button>
            {/* <Box sx={{ borderBottom: "1px solid white", margin: "6px 0" }} /> */}
          </Box>
        )}
        <Box
          flexGrow="1"
          padding={4}
          color="white"
          display="flex"
          justifyContent="center"
        >
          <Routes>
            <Route index element={<WelcomePage />} />
            <Route path="/useSignMessage" element={<SignMessagePage />} />
            <Route path="/useAccount" element={<UseAccountPage />} />
            <Route path="/useBalance" element={<UseBalancePage />} />
            <Route path="/useBlockNumber" element={<UseBlockNumberPage />} />
            <Route path="/useDisconnect" element={<UseDisconnectPage />} />
          </Routes>
          {/* <RouterProvider router={router} /> */}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
