"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const routes_1 = __importDefault(require("./routes"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const constants_1 = require("@shared/constants");
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const { BAD_REQUEST } = http_status_codes_1.default;
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default(constants_1.cookieProps.secret));
app.use(cors_1.default());
// Show routes called in console during development
if (process.env.NODE_ENV) {
    app.use(morgan_1.default('dev'));
}
// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet_1.default());
}
// Add APIs
app.use('/api', routes_1.default);
// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    Logger_1.default.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});
/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/
const buildDir = path_1.default.join(__dirname, 'Build');
app.use(express_1.default.static(buildDir));
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: buildDir });
});
/************************************************************************************
 *                              Export Server
 ***********************************************************************************/
exports.default = app;
