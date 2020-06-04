"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDataBase {
    constructor() {
        super(...arguments);
        this.tableName = "spotnu_users";
    }
    createUser(input) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.getConnection.call(this).raw(`
        INSERT INTO ${this.tableName} (id, name, nickname, email, hashpassword, role)
        VALUES (
          '${input.getId()}', 
          '${input.getName()}', 
          '${input.getNickName()}', 
          '${input.getEmail()}',
          '${input.getPassword()}', 
          '${input.getRole()}'
        )`);
        });
    }
}
exports.UserDatabase = UserDatabase;
