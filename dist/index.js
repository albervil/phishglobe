"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiController = require("./controllers/api");
const compression = require("compression");
const apicache = require("apicache");
const moment = require("moment");
const time = require("express-timestamp");
const app = express();
app.use(compression());
app.use(time.init);
let cache = apicache.middleware;
let lastApiCall = null;
const inSameHour = (req, res) => {
    if (lastApiCall == null || lastApiCall.hour === moment().hour) {
        lastApiCall = req.timestamp;
        return false;
    }
    else {
        return true;
    }
};
const cacheSuccess = cache('1 hour', inSameHour);
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Phishglobe'
    });
});
app.get("/api", cacheSuccess, apiController.index);
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map