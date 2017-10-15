"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const JSONStream = require("jsonstream");
const fs = require("fs");
const filter = require("through2-filter");
exports.index = (req, res) => {
    let last72hrsEntries = filter({ objectMode: true }, function (phish) {
        return moment(phish.submission_time).isAfter(moment().subtract(3, 'days').utc());
    });
    fs.createReadStream("./resources/72hrs-online-valid.json")
        .pipe(JSONStream.parse('*'))
        .pipe(last72hrsEntries)
        .pipe(JSONStream.stringify())
        .pipe(res);
};
//# sourceMappingURL=api.js.map