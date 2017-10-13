import { Response, Request } from "express";
import { Phish } from "../models/Phish"
import * as request from "request";
import * as moment from "moment";
import * as JSONStream from "jsonstream";
import * as fs from "fs";
import * as filter from "through2-filter";

export let index = (req: Request, res: Response) => {
    let last72hrsEntries = filter({ objectMode: true }, function (phish) {
            return moment(phish.submission_time).isAfter(moment().subtract(3, 'days').utc());
        })

    fs.createReadStream("./resources/72hrs-online-valid.json")
        .pipe(JSONStream.parse('*'))
        .pipe(last72hrsEntries)
        .pipe(JSONStream.stringify())
        .pipe(res);
}