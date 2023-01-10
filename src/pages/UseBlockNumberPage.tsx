import { Box, Button, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";

export const UseBlockNumberPage = () => {
  const { data, refetch, isError, isLoading } = wagmi.useBlockNumber();

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <Typography variant="h6" component="div">
          isError: {String(isError)}
        </Typography>
        <Typography variant="h6" component="div">
          isLoading: {String(isLoading)}
        </Typography>
        <Typography variant="h6" component="div">
          Blocknumber: {data}
        </Typography>
        <Button
          onClick={() => {
            refetch();
          }}
        >
          Get Block Number
        </Button>
      </Box>
    </Box>
  );
};
