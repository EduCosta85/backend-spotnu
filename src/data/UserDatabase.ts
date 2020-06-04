import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDataBase {
  protected tableName: string = "spotnu_users";

  public async createUser(input: User): Promise<void> {
    await super.getConnection().raw(`
        INSERT INTO ${this.tableName} (id, name, nickname, email, hashpassword, role)
        VALUES (
          '${input.getId()}', 
          '${input.getName()}', 
          '${input.getNickName()}', 
          '${input.getEmail()}',
          '${input.getPassword()}', 
          '${input.getRole()}'
        )`);
  }
}
