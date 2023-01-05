import { Box, TextField, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";
import { useState } from "react";

export const UseAccountPage = () => {
  const [message, setMessage] = useState("");
  const { address, isConnected, isConnecting, isDisconnected } =
    wagmi.useAccount();

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <Typography variant="h6" component="div">
          Connected Account: {address}
        </Typography>
        <Typography variant="h6" component="div">
          Is Connected: {String(isConnected)}
        </Typography>
        <Typography variant="h6" component="div">
          Is Connecting: {String(isConnecting)}
        </Typography>
        <Typography variant="h6" component="div">
          Is Disconected: {String(isDisconnected)}
        </Typography>
      </Box>
    </Box>
  );
};
