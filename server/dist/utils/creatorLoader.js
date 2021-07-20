"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCreatorLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const createCreatorLoader = () => new dataloader_1.default();
exports.createCreatorLoader = createCreatorLoader;
//# sourceMappingURL=creatorLoader.js.map