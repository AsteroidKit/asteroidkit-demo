import { Box, Button, Typography } from "@mui/material";
import { rainbowkit } from "asteroidkit";

export const UseOpenConnectModal = () => {
  const { openConnectModal } = rainbowkit.useConnectModal();

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={3} flexGrow={1}>
        {!openConnectModal && (
          <Typography variant="h6" component="div" textAlign={"center"}>
            You're currently connected. In order to test this hook call you need
            to <b>Disconnect</b> your wallet
          </Typography>
        )}
        {!!openConnectModal && (
          <Button onClick={() => openConnectModal()}>Open Connect Modal</Button>
        )}
      </Box>
    </Box>
  );
};
