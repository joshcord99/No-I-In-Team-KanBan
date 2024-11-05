import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserData } from "../interfaces/UserData";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
  }

  isTokenExpired(token: string) {
    try {
      // TODO: return a value that indicates if the token is expired
      }
  }

  getToken(): string {
    // TODO: return the token
    
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page

  }
}

export default new AuthService();
