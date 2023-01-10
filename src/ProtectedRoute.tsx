import { wagmi } from "asteroidkit";
import { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const account = wagmi.useAccount();
  if (!account.isConnected) {
    return <Navigate to="/" replace />;
  }

  return children;
};
