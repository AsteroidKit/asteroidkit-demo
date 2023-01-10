import { Box, Button, TextField, Typography } from "@mui/material";
import { wagmi } from "asteroidkit";
import { useState } from "react";

export const SignMessagePage = () => {
  const [message, setMessage] = useState(
    "This is a sample message from AsteroidKit"
  );
  const { data, isError, isLoading, isSuccess, error, signMessage } =
    wagmi.useSignMessage({
      message: message,
    });

  return (
    <Box display="flex" flexGrow="1" padding={4} color="white" maxWidth={1256}>
      <Box display="flex" flexDirection="column" gap={2} flexGrow={1}>
        <Typography variant="h5" component="div">
          Type a message to be signed
        </Typography>
        <TextField
          label="Message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          fullWidth
        />
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
        <Button onClick={() => signMessage()} disabled={!message.length}>
          Sign
        </Button>
      </Box>
    </Box>
  );
};
