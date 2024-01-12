import { useContext } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

import { UserContext } from "../store/userContext";

function GreenScreen({ navigation }) {
  const userPhoneCtx = useContext(UserContext);

  function onChangePhoneNum(phoneNum) {
    userPhoneCtx.setPhoneNum(phoneNum);
  }

  function onPressNext() {
    if (userPhoneCtx.phoneNumValid) {
      navigation.navigate("Registration Validation");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your phone number</Text>
      <TextInput
        value={userPhoneCtx.phoneNum}
        placeholder="Ex: 555-555-1234"
        onChangeText={onChangePhoneNum}
        cursorColor="#333"
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Next" color="darkgreen" onPress={onPressNext} />
      {!userPhoneCtx.phoneNumValid && (
        <Text style={styles.errorText}>Fix Errors</Text>
      )}
    </View>
  );
}

export default GreenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    flexDirection: "column",
    // justifyContent: "center",
    paddingTop: 64,
    alignItems: "center",
    padding: 12,
  },
  text: {
    color: "darkgreen",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    minWidth: 200,
    margin: 6,
    borderWidth: 1,
    borderColor: "darkgreen",
    padding: 10,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});
