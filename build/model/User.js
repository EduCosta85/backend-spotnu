"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.stringToUserRole = exports.User = void 0;
const InvalidParameterError_1 = require("../errors/InvalidParameterError");
class User {
    constructor(id, name, nickName, email, password, role) {
        this.id = id;
        this.name = name;
        this.nickName = nickName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getNickName() {
        return this.nickName;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
}
exports.User = User;
exports.stringToUserRole = (input) => {
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
            throw new InvalidParameterError_1.InvalidParameterError("Invalid user role");
    }
};
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["PREMIUM"] = "PREMIUM";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["BAND"] = "BAND";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
