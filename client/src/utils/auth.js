import decode from 'jwt-decode';

class AuthService {
  // Returns user data from the token
  getUser() {
    return decode(this.getToken());
  }

  // Checks if the user is logged in
  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Checks if the token is expired
  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Saves user token to localStorage and redirects to '/map'
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/map'); // Adjust the navigation target as needed
  }

  // Clears user token and reloads the page to log the user out
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
