import { Response, Request } from "express";
import { Phish } from "../models/Phish"
import * as request from "request";
import * as filter from "lodash.filter";
import * as map from "lodash.map";
import * as moment from "moment";

const API_KEY = 'c780598790867245b643f77ab1d8825f7f8d0671d9c194bdd87a383b9366d45c'

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