import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";


interface DecodedTokenData {
  username: string
  iat: number,
  exp: number
}

interface UserData {
  username: string
  iat: number,
  exp: number
  isAuthenticated: boolean
}

const checkIfUserIsAuthenticated = (): UserData => {
  // Check if the user has a valid JWT token
  const token = Cookies.get("token") || null;
  if (token) {
    try {
      const decodedToken = jwtDecode<DecodedTokenData>(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        const user = {
          ...decodedToken,
          isAuthenticated: true,
        };
        return user;
      } else {
        throw new Error("Token has expired.");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      throw new Error("Invalid token.");
    }
  }

  throw new Error("No token found.");
};

export default checkIfUserIsAuthenticated;
export type { UserData };
