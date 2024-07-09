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
exports.createUser = void 0;
const userModel_1 = require("../model/userModel");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(data);
        const user = yield userModel_1.userModel.create(data);
        if (user) {
            let res = Object.assign(Object.assign({}, user.toObject()), { _id: user === null || user === void 0 ? void 0 : user._id.toHexString() });
            return res;
        }
        else {
            throw new Error('user creation failed');
        }
    }
    catch (error) {
        throw new Error(error === null || error === void 0 ? void 0 : error.message);
    }
});
exports.createUser = createUser;
