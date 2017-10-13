"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiController = require("./controllers/api");
const compression = require("compression");
const app = express();
app.use(compression());
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Phishglobe'
    });
});
app.get("/api", apiController.index);
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map