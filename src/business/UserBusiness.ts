import { UserDatabase } from "../data/UserDatabase";
import { User, stringToUserRole } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { Band } from "../model/Band";
import { ConflictError } from "../errors/ConflictError";

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
    if (userData.role != "ADMIN") {
      throw new UnauthorizedError("You need to be ADMIN to create other admin user.")
    }
    if (password.length < 10) {
      throw new InvalidParameterError("Invalid password lenght");
    }

    return this.userSignup(name, nickname, email, password, role)
  }

  public async bandSignup(
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: string,
    description: string
  ) {
    if (!name || !nickname || !email || !password || !role || !description) {
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

    // console.log(id, name, nickname, email, cryptedPassword, stringToUserRole(role), description)

    const teste = await this.userDatabase.createBand(
      new Band(id, name, nickname, email, cryptedPassword, stringToUserRole(role), description)
    );
  }

  public async login(userlogin: string, password: string) {
    if (!userlogin || !password) {
      throw new InvalidParameterError("Missing input data");
    }

    const user = await this.userDatabase.getUserByLogin(userlogin);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordCorrect = await this.hashGenerator.compareHash(
      password,
      user.getPassword()
    );

    if (!isPasswordCorrect) {
      throw new InvalidParameterError("Invalid password");
    }

    const accessToken = this.tokenGenerator.generate({
      id: user.getId(),
      role: user.getRole(),
    });

    return { accessToken };
  }

  public async getAllBands(token: string) {

    const userData = this.tokenGenerator.verify(token)
    if (userData.role != "ADMIN") {
      throw new UnauthorizedError("You need to be ADMIN to use this endpoint.")
    }

    return this.userDatabase.getAllBands()
  }

  public async bandApprove(token: string, idsearch: string) {

    const allBands = await this.getAllBands(token)
    const band = allBands?.filter((element:any) => {
      console.log(element.id," -- ", idsearch)
      return element.id === idsearch
    }) as any

    if(band?.length == 0) {
      throw new NotFoundError("Band not found")
    }
    if(band[0].isApproved == true) {
      throw new ConflictError("Band already approved")
    }
    await this.userDatabase.bandApprove(idsearch)
  }

}
