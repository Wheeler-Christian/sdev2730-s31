import { useContext } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

import { UserContext } from '../store/userContext';

function BlueScreen({ navigation }) {
  const userNameCtx = useContext(UserContext);

  function onChangeFirstName(firstName) {
    userNameCtx.setFirstName(firstName);
  }

  function onChangeLastName(lastName) {
    userNameCtx.setLastName(lastName);
  }

  function onPressNext() {
    if (userNameCtx.firstNameValid && userNameCtx.lastNameValid) {
      navigation.navigate("Register Phone");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your name</Text>
      <TextInput
        value={userNameCtx.firstName}
        placeholder="First Name"
        onChangeText={onChangeFirstName}
        cursorColor="#333"
        style={styles.input}
      />
      <TextInput
        value={userNameCtx.lastName}
        placeholder="Last Name"
        onChangeText={onChangeLastName}
        cursorColor="#333"
        style={styles.input}
      />
      <Button title="Next" color="darkblue" onPress={onPressNext} />
      <View style={{ margin: 16 }}>
        {(!userNameCtx.firstNameValid || !userNameCtx.lastNameValid) && (
          <Text style={styles.errorText}>Fix Errors</Text>
        )}
      </View>
    </View>
  );
}

export default BlueScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    flexDirection: "column",
    // justifyContent: "center",
    paddingTop: 64,
    alignItems: "center",
    padding: 12,
  },
  text: {
    color: "darkblue",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    minWidth: 200,
    margin: 6,
    borderWidth: 1,
    borderColor: "darkblue",
    padding: 10,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});
