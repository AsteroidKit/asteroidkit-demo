import { Box, Button, Typography } from "@mui/material";
import { useChainModal } from "asteroidkit";

export const UseOpenChainModal = () => {
  const { openChainModal } = useChainModal();

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={3} flexGrow={1}>
        <Typography variant="h4">Hook for opening Chain Modal</Typography>
        {!openChainModal && (
          <Typography variant="h6" component="div" textAlign={"center"}>
            You're currently not connected. In order to test this hook call you
            need to <b>Connect</b> your wallet
          </Typography>
        )}
        {!!openChainModal && (
          <Button onClick={() => openChainModal()}>Open Chain Modal</Button>
        )}
      </Box>
    </Box>
  );
};
