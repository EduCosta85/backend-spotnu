import { User, stringToUserRole, UserRole } from "./User";

export class Band extends User {
  constructor(
    protected id: string,
    protected name: string,
    protected nickName: string,
    protected email: string,
    protected password: string,
    protected role: UserRole,
    private description: string,
    private isApproved?: boolean
  ) {
    super(id,name,nickName,email,password,stringToUserRole(role));
  }

  public getDescription(): string {
    return this.description;
  }
}


