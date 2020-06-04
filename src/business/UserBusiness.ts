import { UserDatabase } from "../data/UserDatabase";
import { User, stringToUserRole } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator
  ) { }

  public async userSignup(
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string
  ) {
    if (!name || !nickname || !email || !password || !role) {
      throw new InvalidParameterError("Missing input data");
    }

    if ((email.indexOf("@") === -1) || (email.length < 3)) {
      //change to better email validation in future - Issue opened #2
      throw new InvalidParameterError("Invalid email");
    }

    if (password.length < 6) {
      throw new InvalidParameterError("Invalid password lenght");
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password);

    await this.userDatabase.createUser(
      new User(id, name, nickname, email, cryptedPassword, stringToUserRole(role))
    );

    const accessToken = this.tokenGenerator.generate({
      id,
      role,
    });
    return { accessToken };
  }

  public async adminSignup(
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string,
    token: string
  ) {

    const userData = this.tokenGenerator.verify(token)
    console.log(userData)
    if (userData.role != "ADMIN") {
      throw new UnauthorizedError("You need to be ADMIN to create other admin user.")
    }

    return this.userSignup(name, nickname, email, password, role)
  }
}
