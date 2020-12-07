import http from "./httpService";
import jwtDecode from "jwt-decode";

// api endpoint
const apiEndPoint = "http://localhost:5000/api/auth";

// login request
export async function login(user) {
  return await http.post(apiEndPoint, {
    email: user.email,
    password: user.password,
  });
}

// logout request
export function logout() {
  sessionStorage.removeItem("token");
}

http.setJwt(getJwt());

// login with accesstoken
export function loginWithJwt(jwt) {
  return sessionStorage.setItem("token", jwt);
}

// get current user
export function getCurrentUser() {
  try {
    const jwt = sessionStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

// get user's access token
export function getJwt() {
  return sessionStorage.getItem("token");
}
