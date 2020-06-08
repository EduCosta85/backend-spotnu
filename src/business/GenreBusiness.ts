import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { GenreDatabase } from "../data/GenreDatabase"
import { UnauthorizedError } from "../errors/UnauthorizedError";


export class GenreBusiness {
  constructor(
    private GenreDatabase: GenreDatabase,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator
  ) { }

  public async createGenre( token: string, name: string ): Promise<void> {

    const userData = this.tokenGenerator.verify(token)
    if (userData.role != "ADMIN") {
      throw new UnauthorizedError("You need to be ADMIN to create new genres.")
    }
    const id = this.idGenerator.generate()

    await this.GenreDatabase.createGenre(id, name)
  }

  public async getAllGenres(): Promise<any> {
    
    const result = await this.GenreDatabase.getAllGenres()
    return result
  }

}
