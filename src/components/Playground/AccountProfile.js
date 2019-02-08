export class AccountProfile {
  static isAuthenticated() {
    return false;
  }

  static logIn() {
    setTimeout(() => "Logged in!", 1);
  }
}
