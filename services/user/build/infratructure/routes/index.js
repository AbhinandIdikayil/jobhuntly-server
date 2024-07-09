"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const routes = (dependencies) => {
    const router = (0, express_1.Router)();
    router.route('/get-allusers').get();
    return router;
};
exports.routes = routes;
