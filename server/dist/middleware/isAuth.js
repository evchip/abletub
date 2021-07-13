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
exports.isAuth = void 0;
const User_1 = require("../entities/User");
const isAuth = ({ context }, next) => {
    console.log(context.req.session);
    function checkUserId(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(ctx.req.session.userId);
            if (!user.id) {
                throw new Error('not authenticated');
            }
            context.req.session.userId = user.id;
        });
    }
    checkUserId(context);
    return next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map