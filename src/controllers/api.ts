import { Response, Request } from "express";
import { Phish } from "../models/Phish"
import * as request from "request";
import * as moment from "moment";
import * as JSONStream from "jsonstream";
import * as fs from "fs";

export let index = (req: Request, res: Response) => {
    fs.createReadStream("./resources/72hrs-online-valid.json")
        .pipe(res);
}