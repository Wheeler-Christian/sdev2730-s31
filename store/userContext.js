import { createContext, useReducer } from "react";

export const UserContext = createContext({
  firstName: "",
  lastName: "",
  phoneNum: "",
  email: "",
  firstNameValid: false,
  lastNameValid: false,
  phoneNumValid: false,
  emailValid: false,
  setFirstName: (newFirstName) => {},
  setLastName: (newLastName) => {},
  setPhoneNum: (newPhoneNum) => {},
  setEmail: (newEmail) => {},
  logout: () => {},
});

function reducer(state, action) {
  let payload = action.payload;
  let valid = false;
  switch (action.type) {
    case "FIRST_NAME":
      if (payload.trim().length > 0) {
        payload = payload.trim();
        valid = true;
      }
      return { ...state, firstName: payload, firstNameValid: valid };
    case "LAST_NAME":
      if (payload.trim().length > 0) {
        payload = payload.trim();
        valid = true;
      }
      return { ...state, lastName: payload, lastNameValid: valid };
    case "PHONE_NUM":
      if (payload.trim().length === 12) {
        valid = true;
        payload = payload.trim();
      }
      return { ...state, phoneNum: payload, phoneNumValid: valid };
    case "EMAIL_ADDR":
      if (payload.trim().length > 1 && payload.includes("@")) {
        valid = true;
        payload = payload.trim();
      }
      return { ...state, email: payload, emailValid: valid };
    case "LOGOUT":
      return {
        firstName: "",
        lastName: "",
        phoneNum: "",
        email: "",
        firstNameValid: false,
        lastNameValid: false,
        phoneNumValid: false,
        emailValid: false,
      };
    default:
      return state;
  }
}

function UserContextProvider({ children }) {
  // use reducer hook
  const [state, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    phoneNum: "",
    email: "",
    firstNameValid: false,
    lastNameValid: false,
    phoneNumValid: false,
    emailValid: false,
  });

  function setFirstName(newFirstName) {
    dispatch({ type: "FIRST_NAME", payload: newFirstName });
  }

  function setLastName(newLastName) {
    dispatch({ type: "LAST_NAME", payload: newLastName });
  }

  function setPhoneNum(newPhoneNum) {
    dispatch({ type: "PHONE_NUM", payload: newPhoneNum });
  }

  function setEmail(newEmail) {
    dispatch({ type: "EMAIL_ADDR", payload: newEmail });
  }

  function logout() {
    dispatch({ type: "LOGOUT", payload: null });
  }

  const value = {
    firstName: state.firstName,
    lastName: state.lastName,
    phoneNum: state.phoneNum,
    email: state.email,
    firstNameValid: state.firstNameValid,
    lastNameValid: state.lastNameValid,
    phoneNumValid: state.phoneNumValid,
    emailValid: state.emailValid,
    setFirstName: setFirstName,
    setLastName: setLastName,
    setPhoneNum: setPhoneNum,
    setEmail: setEmail,
    logout: logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
