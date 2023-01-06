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
import { Link, Route, Routes } from "react-router-dom";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AsteroidIcon from "./assets/asteroid.svg";
import { SignMessagePage } from "./pages/SignMessagePage";
import { UseAccountPage } from "./pages/useAccountPage";
import { UseBalancePage } from "./pages/useBalancePage";
import { UseBlockNumberPage } from "./pages/UseBlockNumberPage";
import { UseDisconnectPage } from "./pages/UseDisconnectPage";
import { WelcomePage } from "./pages/WelcomePage";
import { UseContractReadPage } from "./pages/UseContractReadPage";
import { UseSwitchNetwork } from "./pages/UseSwitchNetwork";
import { UseTransaction } from "./pages/UseTransaction";
import { UseOpenConnectModal } from "./pages/UseOpenConnectModalPage";
import { UseOpenAccountModal } from "./pages/UseOpenAccountModalPage";
import { UseOpenChainModal } from "./pages/UseOpenChainModalPage";

const upAndDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-18px);
  }
`;

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
            <Button
              size="small"
              component={Link}
              to="./useContractReadPage"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useContractReadPage
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useSwitchNetwork"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useSwitchNetwork
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useTransaction"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useTransaction
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useConnectModal"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useConnectModal
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useAccountModal"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useAccountModal
            </Button>
            <Button
              size="small"
              component={Link}
              to="./useChainModal"
              variant="text"
              sx={{ color: "white", textTransform: "none", fontWeight: 500 }}
            >
              useChainModal
            </Button>
            {/* <Box sx={{ borderBottom: "1px solid white", margin: "6px 0" }} /> */}
          </Box>
        )}
        <Box
          padding={4}
          color="white"
          display="flex"
          maxHeight={"calc(100vh - 130px)"}
          overflow="hidden auto"
          width="100%"
          justifyContent="center"
        >
          <Routes>
            <Route index element={<WelcomePage />} />
            <Route path="/useSignMessage" element={<SignMessagePage />} />
            <Route path="/useAccount" element={<UseAccountPage />} />
            <Route path="/useBalance" element={<UseBalancePage />} />
            <Route path="/useBlockNumber" element={<UseBlockNumberPage />} />
            <Route path="/useDisconnect" element={<UseDisconnectPage />} />
            <Route
              path="/useContractReadPage"
              element={<UseContractReadPage />}
            />
            <Route path="/useSwitchNetwork" element={<UseSwitchNetwork />} />
            <Route path="/useTransaction" element={<UseTransaction />} />
            <Route path="/useConnectModal" element={<UseOpenConnectModal />} />
            <Route path="/useAccountModal" element={<UseOpenAccountModal />} />
            <Route path="/useChainModal" element={<UseOpenChainModal />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
