import { Box, Button, TextField, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";
import { useEffect, useRef, useState } from "react";

export const UseBalancePage = () => {
  const [address, setAddress] = useState("");
  const initialAccountSet = useRef(false);
  const [onGoingaddress, setOnGoingAddress] = useState("");
  const account = wagmi.useAccount();

  const { data, isError, isLoading } = wagmi.useBalance({
    address: address as any,
  });

  useEffect(() => {
    if (account.isConnected && !initialAccountSet.current) {
      setOnGoingAddress(account.address as any);
      setAddress(account.address as any);
    }
    initialAccountSet.current = true;
  }, [account]);

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
          Balance: {data?.formatted}
        </Typography>
        <form
          id="addressForm"
          onSubmit={(e) => {
            e.preventDefault();
            setAddress(onGoingaddress);
          }}
        >
          <TextField
            variant="filled"
            label="Address"
            value={onGoingaddress}
            onChange={(e) => {
              setOnGoingAddress(e.target.value);
            }}
            fullWidth
          />
        </form>
        <Button form="addressForm" type="submit" disabled={!address.length}>
          Get Balance
        </Button>
      </Box>
    </Box>
  );
};
