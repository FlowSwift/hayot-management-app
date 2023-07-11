import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";


const checkIfUserIsAuthenticated = (): boolean => {
  // Check if the user has a valid JWT token
  const token = Cookies.get("token") || null

  if (token) {
    try {
      // Decode the JWT token
      const decodedToken: { exp: number } = jwtDecode(token);
      // Check if the token is expired
      if (decodedToken.exp * 1000 > Date.now()) {
        console.log("check")
        // Token is valid and not expired
        return true;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Token is invalid or expired
  return false;
};

export default checkIfUserIsAuthenticated;
