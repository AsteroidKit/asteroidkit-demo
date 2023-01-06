import { Box, Button, Typography } from "@mui/material";
import { rainbowkit } from "asteroidkit";

export const UseOpenAccountModal = () => {
  const { openAccountModal } = rainbowkit.useAccountModal();

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={3} flexGrow={1}>
        {!openAccountModal && (
          <Typography variant="h6" component="div" textAlign={"center"}>
            You're currently not connected. In order to test this hook call you
            need to <b>Connect</b> your wallet
          </Typography>
        )}
        {!!openAccountModal && (
          <Button variant="outlined" onClick={() => openAccountModal()}>
            Open Account Modal
          </Button>
        )}
      </Box>
    </Box>
  );
};