"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGlobalMiddleware = loggerGlobalMiddleware;
function loggerGlobalMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    const { method, url } = req;
    const actualDate = new Date();
    const date = actualDate.toLocaleDateString();
    const time = actualDate.toLocaleTimeString();
    console.log(`Date: ${date} Time: ${time} Method: ${method} URL: ${url}`);
    next();
}
//# sourceMappingURL=loggermilddware.middleware.js.map