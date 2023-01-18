import { Box, Button, Typography } from "@mui/material";
import { useNetwork, useSwitchNetwork } from "wagmi";

export const UseSwitchNetwork = () => {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <Typography variant="h4">
          Hook for switching networks with a connector
        </Typography>
        {chain && (
          <Typography variant="h6" component="div">
            <div>Connected to {chain.name}</div>
          </Typography>
        )}
        <Typography variant="h6" component="div">
          isLoading: {String(isLoading)}
        </Typography>
        {error && (
          <Typography variant="h6" component="div">
            {String(error)}
          </Typography>
        )}
        {chains.map((x) => (
          <Button
            key={x.id}
            disabled={!switchNetwork || x.id === chain?.id}
            onClick={() => switchNetwork?.(x.id)}
          >
            {x.name}
            {isLoading && pendingChainId === x.id && " (switching)"}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
