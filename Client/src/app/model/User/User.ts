export interface User {
  id: number;
  email: string;
  fullName: string;
  organizationRoles: UserOrganizationRole[];
  refreshToken: string;
  refreshTokenExpiryTime: string; // use string for Date when received as JSON
}

export interface UserOrganizationRole {
  // define properties matching your C# class 'UserOrganizationRole'
  // example:
  id: number;
  organizationId: number;
  roleName: string;
}
