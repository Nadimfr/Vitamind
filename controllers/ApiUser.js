import { Alert } from "react-native";
import { APIKIT } from "./ApiKit";

export const userLogin = async (userInfo) => {
  return await APIKIT.post("/Account/Login", userInfo).then((res) => {
    if (res.data.success) return res.data.data;
    else Alert.alert(res.data.message);
  });
};

export const getUserDetails = async () => {
  return await APIKIT.get("/api/users").then((res) => {
    if (res.data) return res.data;
    else Alert.alert(res.data);
  });
};
