import { InvalidParameterError } from "../errors/InvalidParameterError";

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickName: string,
    private email: string,
    private password: string,
    private role: UserRole
  ) {}

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getNickName(): string {
    return this.nickName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): UserRole {
    return this.role;
  }
}

export const stringToUserRole = (input: string): UserRole => {
  switch (input) {
    case "USER":
      return UserRole.USER;
    case "PREMIUM":
      return UserRole.PREMIUM;
    case "ADMIN":
      return UserRole.ADMIN;
    case "BAND":
      return UserRole.BAND;
    default:
      throw new InvalidParameterError("Invalid user role");
  }
};

export enum UserRole {
  USER = "USER",
  PREMIUM = "PREMIUM",
  ADMIN = "ADMIN",
  BAND = "BAND",
}
