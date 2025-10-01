import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  email: string;
  name: string;
  exp?: number;
  iat?: number;
}

export class User {
  static currentUser: User | null = null;

  email: string;
  fullName: string;
  id?: number;
  accessToken?: string;

  constructor(email: string, fullName: string, accessToken?: string, id?: number) {
    this.email = email;
    this.fullName = fullName;
    this.accessToken = accessToken;
    this.id = id;
  }

  static setCurrentUserFromToken(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (!decoded.email || !decoded.name) {
        throw new Error('Token missing required fields');
      }

      const user = new User(decoded.email, decoded.name, token);
      User.currentUser = user;
    } catch (err) {
      console.error('Invalid JWT token', err);
      User.clearCurrentUser();
    }
  }

  static getCurrentUser(): User | null {
    return User.currentUser;
  }

  static clearCurrentUser() {
    User.currentUser = null;
  }
}
