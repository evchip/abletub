"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = require("./entities/Post");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post_1._Post, User_1.User],
    dbName: "lireddit4",
    type: 'postgresql',
    user: 'Evan',
    password: 'flaauer^s00p',
    debug: !constants_1.__prod__
};
//# sourceMappingURL=mikro-orm.config.js.map