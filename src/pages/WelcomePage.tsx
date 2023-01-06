import { Box, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";

export const WelcomePage = () => {
  const { address, isConnected, isDisconnected } = wagmi.useAccount();

  if (isDisconnected) {
    return (
      <Box
        display="flex"
        flexGrow="1"
        padding={4}
        color="white"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
          <Typography variant="h2" component="div">
            Welcome to <b>AsteroidKit</b> Demo App
          </Typography>
          <Typography variant="h4" component="div">
            Go ahead and connect your <b>wallet</b>
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexGrow="1"
      padding={4}
      color="white"
      justifyContent="center"
      alignItems="center"
    >
      <Box display="flex" alignItems="center" flexDirection="column" gap={2}>
        <Typography variant="h3" component="div">
          You're connected!
        </Typography>
        <Typography variant="h5" component="div">
          Now go ahead and try some of the options on the left menu
        </Typography>
      </Box>
    </Box>
  );
};
