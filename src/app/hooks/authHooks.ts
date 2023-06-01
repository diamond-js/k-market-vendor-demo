import { User } from "firebase/auth";
import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  user: User | null;
  isLoadingUser: boolean;
  isLoggedIn: boolean;
}>({
  user: null,
  isLoadingUser: false,
  isLoggedIn: false,
});

export const useAuthContext = () => useContext(AuthContext);
