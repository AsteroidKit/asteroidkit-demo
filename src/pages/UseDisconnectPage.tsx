import { Box, Button, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";

export const UseDisconnectPage = () => {
  const { disconnect, isError, isLoading } = wagmi.useDisconnect();

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <Typography variant="h4">
          Hook for disconnecting the connected account
        </Typography>
        <Typography variant="h6" component="div">
          isError: {String(isError)}
        </Typography>
        <Typography variant="h6" component="div">
          isLoading: {String(isLoading)}
        </Typography>
        <Button
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </Button>
      </Box>
    </Box>
  );
};
