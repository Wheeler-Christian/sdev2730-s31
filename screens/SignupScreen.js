import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { UserContext } from "../store/userContext";
import { createUser } from "../util/auth";

function SignupScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (signupError) {
      Alert.alert(
        "Authentication failed!",
        "Could not create user, please check your input and try again later!"
      );
      setIsAuthenticating(false);
    }
    authCtx.setIsSignup(true);
    userCtx.setEmail(email);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
