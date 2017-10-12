import * as request from "request";
import { Moment } from "moment";
import * as map from "lodash.map";

export class Phish {
    private phish_id: number;
    private url: string;
    private phish_detail_url: string;
    private submission_time: string;
    private verified: boolean;
    private online: boolean;
    private target: string;
    private lat: number;
    private lon: number;

    constructor(phish: Object) {
        this.phish_id = +phish['phish_id'];
        this.url = phish['url'];
        this.phish_detail_url = phish['phish_detail_url'];
        this.submission_time = phish['submission_time'];
        this.verified = phish['verified'] === 'yes';
        this.online = phish['online'] === 'yes';
        this.target = phish['target'];
    }

    public static process(phish: Object): Promise<Phish> {
        let ip = phish['details'][0]['ip_address']
        return new Promise(function (resolve, reject) {
            let p = new Phish(phish);
            request.get(`https://ipinfo.io/${ip}/json`, function (error, response, body) {
                if (error) {
                    return reject(error);
                }

                let loc = JSON.parse(body)["loc"]
            
                if (loc !== undefined) {    
                    let location = loc.split(",");
                    p.lat = +location[0];
                    p.lon = +location[1];
                }

                resolve(p);
            });
        });
    }
}