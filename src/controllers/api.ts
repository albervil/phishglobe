import { Response, Request } from "express";
import { Phish } from "../models/Phish"
import * as request from "request";
import * as moment from "moment";
import * as JSONStream from "jsonstream";

export let index = (req: Request, res: Response) => {
    let results = Array<Phish>();
    
    request.get(`http://data.phishtank.com/data/online-valid.json`)
        .pipe(JSONStream.parse('*'))
        .on('data', function (phish) {
            if (moment(phish.submission_time).isAfter(moment().subtract(3, 'days').utc())) {
                Phish.process(phish).then(function(p){
                    results.push(p);
                })
            }
        })
        .on('end', function () {
            res.json(results);
        })
}