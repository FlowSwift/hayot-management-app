import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

interface myToken {
  username: string;
  exp: number;
  iat: number;
}

const checkIfUserIsAuthenticated = (): myToken | false => {
  // Check if the user has a valid JWT token
  const token = Cookies.get("token") || null

  if (token) {
    try {
      // Decode the JWT token
      const decodedToken = jwtDecode<myToken>(token);
      // Check if the token is expired
      if (decodedToken.exp * 1000 > Date.now()) {
        console.log("check")
        // Token is valid and not expired
        return decodedToken;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Token is invalid or expired
  return false;
};

export default checkIfUserIsAuthenticated;
export type {myToken};
