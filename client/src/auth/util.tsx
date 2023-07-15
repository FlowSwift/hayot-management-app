import axios from 'axios';
import Cookies from 'js-cookie';

interface UserData {
  username: string,
  isAuthenticated: boolean
}

const checkIfUserIsAuthenticated = async (): Promise<UserData> => {
  // Check if the user has a valid JWT token
  const token = Cookies.get("token") || null;
  if (token) {
    try {
      const { data: response } = await axios.get('http://localhost:5000/auth/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.isAuthenticated){
        const user: UserData = {...response};
        return user;
      }
    } catch (error) {
      console.log(error)
    }
  }

  throw new Error("Invalid token found.");
};

export default checkIfUserIsAuthenticated;
export type { UserData };
