import { useContext } from "react";

import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome to this app</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 26,
  },
});
