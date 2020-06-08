import { BaseDataBase } from "./BaseDatabase";
import { ConflictError } from "../errors/ConflictError";
import { GenericError } from "../errors/GenericError";

export class GenreDatabase extends BaseDataBase {
  protected tableName: string = "spotnu_genres";

  public async createGenre(id: string, name: string) {
    try {
      const result = await super.getConnection().raw(`
      INSERT INTO ${this.tableName} (id, name)
      VALUES (
        '${id}', 
        '${name}'
      )`);
    } catch (error) {
      if(error.errno == "1062") {
        throw new ConflictError(`This genre already exists: ${error.sqlMessage}`)
      }
    }
  }

  public async getAllGenres() {
    try {
      const result = await super.getConnection().raw(`
      SELECT * FROM ${this.tableName}`);
      const data: { id: string; name: string; }[] = []
      result[0].forEach((element: { id: string; name: string; }) => {
        return data.push({id: element.id, name: element.name})
      });
      return data

    } catch (error) {
      throw new GenericError(`${error.sqlMessage}`)
    }
  }

}
