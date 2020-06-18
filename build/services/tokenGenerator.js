"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGenerator = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let TokenGenerator = /** @class */ (() => {
    class TokenGenerator {
        constructor() {
            this.generate = (input) => {
                const newToken = jwt.sign({
                    id: input.id,
                    role: input.role,
                }, process.env.JWT_KEY, {
                    expiresIn: TokenGenerator.expiresIn,
                });
                return newToken;
            };
        }
        verify(token) {
            const payload = jwt.verify(token, process.env.JWT_KEY);
            const result = { id: payload.id, role: payload.role };
            return result;
        }
    }
    TokenGenerator.expiresIn = 1200;
    return TokenGenerator;
})();
exports.TokenGenerator = TokenGenerator;
