import { useContext, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

import { UserContext } from "../store/userContext";
import { storeUser } from "../util/http";

function ValidationScreen({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // get the user context
  const authCtx = useContext(AuthContext);
  const userCtx = useContext(UserContext);

  // convert data to database friendly format
  const userData = {
    firstName: userCtx.firstName,
    lastName: userCtx.lastName,
    phoneNumber: userCtx.phoneNum,
    emailAddress: userCtx.email,
  };

  async function yesBtnHandler() {
    setIsSubmitting(true);
    try {
      const response = await storeUser(userData);
      // setIsSubmitting(false);
    } catch (myError) {
      alert("Could not add new user: " + myError, navigation.popToTop());
    }
    authCtx.setIsSignup(false); //signup process is finished!
  }

  function noBtnHandler() {
    alert("Okay, you can enter information again.", navigation.popToTop());
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`First Name: ${userData.firstName}`}</Text>
        <Text style={styles.text}>{`Last Name: ${userData.lastName}`}</Text>
        <Text style={styles.text}>{`Phone: ${userData.phoneNumber}`}</Text>
        <Text style={styles.text}>{`Email: ${userData.emailAddress}`}</Text>
        <Text style={[styles.text, styles.question]}>
          Is the above info correct?
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Yes" color="green" onPress={yesBtnHandler} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="No" color="red" onPress={noBtnHandler} />
        </View>
      </View>
    </View>
  );
}

export default ValidationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  textContainer: {
    marginHorizontal: 36,
  },
  text: {
    color: "#ddd",
    fontSize: 18,
    fontWeight: "bold",
  },
  question: {
    marginVertical: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonContainer: {
    width: "25%",
    marginHorizontal: 16,
  },
});
