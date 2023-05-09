import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSignMessage, useSignTypedData } from "wagmi";

import ReactJson from "react-json-view";

export const SignTypedMessagePage = () => {
  const [domain, setDomain] = useState({
    name: "Ether Mail",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  } as const);
  const [types, setTypes] = useState({
    Person: [
      { name: "name", type: "string" },
      { name: "wallet", type: "address" },
    ],
    Mail: [
      { name: "from", type: "Person" },
      { name: "to", type: "Person" },
      { name: "contents", type: "string" },
    ],
  } as const);
  const [message, setMessage] = useState({
    from: {
      name: "Foo",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    },
    to: {
      name: "Bar",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: "Hello, Bar!",
  } as const);

  const { data, error, isError, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      value: message,
      types,
    });

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <Typography variant="h4">
          Hook for signing typed messages with connected account.
        </Typography>
        <Typography variant="h5">Domain</Typography>
        <Box
          bgcolor="#b0b6ff"
          padding={3}
          borderRadius={2}
          overflow="auto"
          minHeight="100px"
        >
          <ReactJson
            src={domain}
            onEdit={({ updated_src }) => setDomain(updated_src as any)}
            style={{ wordBreak: "break-all" }}
          />
        </Box>
        <Typography variant="h5">Types</Typography>
        <Box
          bgcolor="#b0b6ff"
          padding={3}
          borderRadius={2}
          overflow="auto"
          minHeight="500px"
        >
          <ReactJson
            src={types}
            onEdit={({ updated_src }) => setTypes(updated_src as any)}
            style={{ wordBreak: "break-all" }}
          />
        </Box>
        <Typography variant="h5">Message</Typography>
        <Box
          bgcolor="#b0b6ff"
          padding={3}
          borderRadius={2}
          overflow="auto"
          minHeight="200px"
        >
          <ReactJson
            src={message}
            onEdit={({ updated_src }) => setMessage(updated_src as any)}
            style={{ wordBreak: "break-all" }}
          />
        </Box>
        <Box>
          {!!data && (
            <>
              <Typography variant="h5" component="div">
                Hash:
              </Typography>
              <Typography component="div">{data}</Typography>
            </>
          )}
          {(!!data || !!error || isLoading) && (
            <Box>
              <Typography variant="h5" component="div">
                Status:
              </Typography>
              <Typography component="div">
                {isLoading && <div>Loading...</div>}
                {isError && <div>Error: {error?.message}</div>}
                {isSuccess && <div>Success</div>}
              </Typography>
            </Box>
          )}
        </Box>
        <Button onClick={() => signTypedData()}>Sign</Button>
      </Box>
    </Box>
  );
};
