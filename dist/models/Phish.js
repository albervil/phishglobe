"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
class Phish {
    constructor(phish) {
        this.phish_id = +phish['phish_id'];
        this.url = phish['url'];
        this.phish_detail_url = phish['phish_detail_url'];
        this.submission_time = phish['submission_time'];
        this.verified = phish['verified'] === 'yes';
        this.online = phish['online'] === 'yes';
        this.target = phish['target'];
    }
    static process(phish) {
        let ip = phish['details'][0]['ip_address'];
        return new Promise(function (resolve, reject) {
            let p = new Phish(phish);
            request.get(`https://ipinfo.io/${ip}/json`, function (error, response, body) {
                if (error) {
                    return reject(error);
                }
                let ipinfo = JSON.parse(body);
                let loc = ipinfo["loc"];
                if (loc !== undefined) {
                    let location = loc.split(",");
                    p.lat = +location[0];
                    p.lon = +location[1];
                    p.country = ipinfo.country;
                }
                else {
                    p.country = "Undefined";
                }
                resolve(p);
            });
        });
    }
}
exports.Phish = Phish;
//# sourceMappingURL=Phish.js.map