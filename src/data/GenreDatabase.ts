import { BaseDataBase } from "./BaseDatabase";
import { ConflictError } from "../errors/ConflictError";

export class GenreDatabase extends BaseDataBase {
  protected tableName: string = "spotnu_genres";

  public async createGenre(id: string, name: string) {
    try {
      const teste = await super.getConnection().raw(`
      INSERT INTO ${this.tableName} (id, name)
      VALUES (
        '${id}', 
        '${name}'
      )`);
      console.log(teste)
    } catch (error) {
      console.log(error)
      if(error.errno == "1062") {
        throw new ConflictError("This genre already exists")
      }
    }
  }

}
