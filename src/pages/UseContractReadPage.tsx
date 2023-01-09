import { Box, TextField, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";
import { useState } from "react";
import ERC20ABI from "../ERC20ABI.json";

export const UseContractReadPage = () => {
  const [contractAddress, setContractAddress] = useState(
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  );
  const [callArguments, setCallArguments] = useState("");
  const [methodName, setMethodName] = useState("decimals");

  const { data, isError, error, isLoading } = wagmi.useContractRead({
    address: contractAddress,
    abi: ERC20ABI,
    functionName: methodName,
    args: callArguments.trim().length ? callArguments.split(";") : [],
  });

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <TextField
          label="Contract Addresss"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          fullWidth
        />
        <TextField
          label="Method Name"
          placeholder="decimals"
          value={methodName}
          onChange={(e) => setMethodName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Arguments (separated by `;`)"
          placeholder="argA;argB"
          value={callArguments}
          onChange={(e) => setCallArguments(e.target.value)}
          fullWidth
        />
        <Typography variant="h6" component="div">
          isError: {String(isError)}
        </Typography>
        {error && (
          <Typography variant="h6" component="div">
            {String(error)}
          </Typography>
        )}
        <Typography variant="h6" component="div">
          isLoading: {String(isLoading)}
        </Typography>
        <Typography variant="h6" component="div">
          Data: {String(data)}
        </Typography>
      </Box>
    </Box>
  );
};
