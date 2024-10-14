"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", ""],
    credentials: true,
}));
// module routes
app.use("/api", routes_1.default);
// test routes
app.get("/", (req, res) => {
    const a = "Hello world";
    res.send(a);
});
// global error handler middleware
app.use(globalErrorHandler_1.default);
// not found route middleware
app.use(notFound_1.default);
exports.default = app;
