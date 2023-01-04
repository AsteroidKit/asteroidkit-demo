// import { Example } from "rkwa_tsup";
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
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AsteroidIcon from "./assets/asteroid.svg";
import { WelcomePage } from "./WelcomePage";

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
            <Button size="small" variant="text" sx={{ color: "white" }}>
              Sign Message
            </Button>
            <Button size="small" variant="text" sx={{ color: "white" }}>
              Sign Message
            </Button>
            <Button size="small" variant="text" sx={{ color: "white" }}>
              Sign Message
            </Button>
          </Box>
        )}
        <Box flexGrow="1" padding={4} color="white" display="flex">
          <RouterProvider router={router} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
