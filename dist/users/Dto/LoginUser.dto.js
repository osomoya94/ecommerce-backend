"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const createUser_dto_1 = require("./createUser.dto");
class LoginUserDto extends (0, swagger_1.PickType)(createUser_dto_1.createUser, ['email', 'password']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=LoginUser.dto.js.map