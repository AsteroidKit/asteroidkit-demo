import { Box, Button, TextField, Typography } from "@mui/material";
import { useNetwork, useTransaction } from "wagmi";
import { useEffect, useRef, useState } from "react";
import ReactJson from "react-json-view";

const defaultHashs: any = {
  Ethereum:
    "0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060",
  Polygon: "0x15bbfda7fd45a3af487f5041411c3181d85f8001baf96228116cdb8e691ac89a",
};

export const UseTransaction = () => {
  const network = useNetwork();
  const previousNetwork = useRef("");

  const [transactionHash, setTransactionHash] = useState("");

  const [submitedTransactionHash, setSubmitedTransactionHash] = useState("");

  useEffect(() => {
    if (
      network.chain?.name &&
      network.chain?.name !== previousNetwork.current
    ) {
      setTransactionHash(defaultHashs[network.chain.name]);
      setSubmitedTransactionHash(defaultHashs[network.chain.name]);
      previousNetwork.current = network.chain?.name;
    }
  }, [network]);

  const { data, error, isLoading } = useTransaction({
    hash: submitedTransactionHash as any,
  });

  return (
    <form
      style={{ flexGrow: 1 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitedTransactionHash(transactionHash);
      }}
    >
      <Box
        display="flex"
        flexGrow="1"
        padding={4}
        color="white"
        maxWidth={1256}
      >
        <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
          <Typography variant="h4">
            Hook for fetching transaction by hash
          </Typography>
          <Typography variant="h6" component="div">
            isLoading: {String(isLoading)}
          </Typography>
          {error && (
            <Typography variant="h6" component="div">
              {String(error)}
            </Typography>
          )}
          {!!data && (
            <Box
              bgcolor="#b0b6ff"
              padding={3}
              borderRadius={2}
              overflow="hidden"
            >
              <ReactJson
                src={data}
                collapsed
                style={{ wordBreak: "break-all" }}
              />
            </Box>
          )}
          <TextField
            label="Transaction Hash"
            placeholder="0x"
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
            fullWidth
          />
          <Button onClick={() => setSubmitedTransactionHash(transactionHash)}>
            Get Transaction Info
          </Button>
        </Box>
      </Box>
    </form>
  );
};
