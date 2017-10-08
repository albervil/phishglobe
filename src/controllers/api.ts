import { Response, Request } from "express";
import { Phish } from "../models/Phish"
import * as request from "request";
import * as filter from "lodash.filter";
import * as map from "lodash.map";
import * as moment from "moment";

export let index = (req: Request, res: Response) => {
    request.get(`http://data.phishtank.com/data/online-valid.json`, function (error, response, body) {
        let objects = JSON.parse(body);
        let data = filter(objects, function (phish) {
            return moment(phish.submission_time).isAfter(moment().subtract(3, 'days').utc())
        });
        let promises = Array<Promise<Phish>>();

        map(data, function (phish) {
            promises.push(Phish.process(phish))
        })

        Promise.all(promises).then(function (results) {
            res.json(results)
        })
    })
}