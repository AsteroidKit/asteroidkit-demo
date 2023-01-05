import { Box, Button, TextField, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";
import { useState } from "react";

export const UseBalancePage = () => {
  const [address, setAddress] = useState("");
  const { data, isError, isLoading } = wagmi.useBalance({
    address: address as any,
  });

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <TextField
          variant="outlined"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
        />
        <Typography variant="h6" component="div">
          isError: {String(isError)}
        </Typography>
        <Typography variant="h6" component="div">
          isLoading: {String(isLoading)}
        </Typography>
        <Typography variant="h6" component="div">
          Balance: {data?.formatted}
        </Typography>
      </Box>
    </Box>
  );
};
