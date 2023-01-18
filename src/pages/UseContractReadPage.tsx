import { Box, Button, TextField, Typography } from "@mui/material";
import { useNetwork, useContractRead } from "wagmi";
import { useEffect, useRef } from "react";
import { useState } from "react";
import ERC20ABI from "../ERC20ABI.json";

export const UseContractReadPage = () => {
  const [contractAddress, setContractAddress] = useState(
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  );
  const [callArguments, setCallArguments] = useState("");
  const [methodName, setMethodName] = useState("decimals");

  const [submitedContractAddress, setSubmitedContractAddress] = useState(
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  );
  const [submitedCallArguments, setSubmitedCallArguments] = useState("");

  const [submitedMethodName, setSubmitedMethodName] = useState("decimals");

  const previousNetwork = useRef("");

  const network = useNetwork();

  const { data, isError, error, isLoading } = useContractRead({
    address: submitedContractAddress as any,
    abi: ERC20ABI,
    functionName: submitedMethodName,
    args: submitedCallArguments.trim().length
      ? submitedCallArguments.split(";")
      : [],
  });

  useEffect(() => {
    if (
      network.chain?.name &&
      network.chain?.name !== previousNetwork.current
    ) {
    }
  }, []);

  return (
    <form
      style={{ flexGrow: 1 }}
      onSubmit={(e) => {
        e.preventDefault();

        setSubmitedContractAddress(contractAddress);
        setSubmitedCallArguments(callArguments);
        setSubmitedMethodName(methodName);
      }}
    >
      <Box
        flexGrow={1}
        display="flex"
        padding={4}
        color="white"
        maxWidth={1256}
      >
        <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
          <Typography variant="h4">
            Hook for calling an ethers Contract read-only method
          </Typography>
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
          <Button type="submit">Call Contract Method</Button>
        </Box>
      </Box>
    </form>
  );
};
