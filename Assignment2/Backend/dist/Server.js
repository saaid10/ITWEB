"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const routes_1 = __importDefault(require("./routes"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const compression_1 = __importDefault(require("compression"));
const db_1 = __importDefault(require("@models/db"));
var cors = require('cors');
const app = express_1.default();
const { BAD_REQUEST } = http_status_codes_1.default;
app.use(cors());
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(compression_1.default());
// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
else {
    app.use(helmet_1.default());
}
new db_1.default();
// Add APIs
app.use('/api', routes_1.default);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        Logger_1.default.err(err, true);
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
    else {
        next(err);
    }
});
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
const viewsDir = path_1.default.join(__dirname, 'Build');
app.set('views', viewsDir);
const staticDir = path_1.default.join(__dirname, 'Build');
app.use(express_1.default.static(staticDir));
app.get('*', (req, res) => {
    res.sendFile('index.html', { root: viewsDir });
});
// Export express instance
exports.default = app;
