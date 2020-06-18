import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";
import { ConflictError } from "../errors/ConflictError";

export class UserDatabase extends BaseDataBase {
  protected tableName: string = "spotnu_users";

  private toModelUser(dbModel?: any): User | undefined {
    return (
      dbModel &&
      new User(
        dbModel.id,
        dbModel.name,
        dbModel.nickname,
        dbModel.email,
        dbModel.hashpassword,
        dbModel.role
      )
    );
  }

  public async createUser(input: User): Promise<void> {
    try {
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
    } catch (error) {
      if (error.code == "ER_DUP_ENTRY") {
        throw new ConflictError(`Duplicate entry not allowed - ${error.sqlMessage}`)
      }
    }
  }

  public async createBand(input: Band): Promise<void> {
    try {
      await super.getConnection().raw(`
      INSERT INTO ${this.tableName} (id, name, email, hashpassword, role, nickname, band_description)
      VALUES (
        '${input.getId()}', 
        '${input.getName()}', 
        '${input.getEmail()}',
        '${input.getPassword()}', 
        '${input.getRole()}',
        '${input.getNickName()}', 
        '${input.getDescription()}'
      )`);
    } catch (error) {
      if (error.code == "ER_DUP_ENTRY") {
        throw new ConflictError(`Duplicate entry not allowed - ${error.sqlMessage}`)
      }
    }
  }

  public async getUserByLogin(login: string): Promise<User | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName} WHERE (email = '${login}') OR (nickname = '${login}')
      `);
    return this.toModelUser(result[0][0]);
  }

  public async getUserById(id: string): Promise<User | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName} WHERE id = '${id}'
      `);
    return this.toModelUser(result[0][0]);
  }

  public async getAllBands(): Promise<string[] | undefined> {
    const result = await super.getConnection().raw(`
      SELECT * from ${this.tableName} WHERE role = 'BAND'
      `);
    const bandsArr: any[] = []
    result[0].forEach((element: { id: string; name: string; email: string; nickname: string; aproved: boolean; }) => {
      bandsArr.push({id: element.id, name: element.name, email: element.email, nickname: element.nickname, isApproved: !!element.aproved})
    });
    return bandsArr
  } 

  public async bandApprove(id: string): Promise<void> {
    const result = await super.getConnection().raw(`
      UPDATE ${this.tableName} SET aproved = '1' WHERE id = '${id}'
      `);
  } 
}
