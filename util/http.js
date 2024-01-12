import axios from "axios";

const BACKEND_URL = "https://sdev2730-s31-default-rtdb.firebaseio.com";

export async function storeUser(userData) {
  const response = await axios.post(BACKEND_URL + "/users.json", userData);
  const id = response.data.name;
  return id;
}
