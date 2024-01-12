import AsyncStorage from "@react-native-async-storage/async-storage";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  isSignup: false,
  authenticate: (token) => {},
  logout: () => {},
  setIsSignup: (newBoolean) => {} 
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [isNewAuthentication, setIsNewAuthentication] = useState(false);

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  function setIsSignup(newBoolean) {
    setIsNewAuthentication(newBoolean);
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    isSignup: isNewAuthentication,
    authenticate: authenticate,
    logout: logout,
    setIsSignup: setIsSignup
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
