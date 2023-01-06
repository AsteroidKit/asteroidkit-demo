import { Box, TextField, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";
import { useState } from "react";
import ReactJson from "react-json-view";

export const UseTransaction = () => {
  const [transactionHash, setTransactionHash] = useState(
    "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060"
  );

  const { data, error, isLoading } = wagmi.useTransaction({
    hash: transactionHash as any,
  });

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <TextField
          variant="outlined"
          label="Transaction Hash"
          placeholder="0x"
          value={transactionHash}
          onChange={(e) => setTransactionHash(e.target.value)}
          fullWidth
        />
        <Typography variant="h6" component="div">
          isLoading: {String(isLoading)}
        </Typography>
        {error && (
          <Typography variant="h6" component="div">
            {String(error)}
          </Typography>
        )}
        {!!data && (
          <Box bgcolor="#b0b6ff" padding={3} borderRadius={2}>
            <ReactJson src={data} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
