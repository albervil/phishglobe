import * as express from "express";
import * as apiController from "./controllers/api"
import * as compression from "compression";
import * as apicache from "apicache";
import * as moment from "moment";
import * as time from 'express-timestamp';

const app = express();
app.use(compression());
app.use(time.init)

let cache = apicache.middleware
let lastApiCall = null;

const inSameHour = (req, res) => {
    if (lastApiCall == null || lastApiCall.hour === moment().hour) {
        lastApiCall = req.timestamp;
        return false;
    } else {
        return true;
    }
}
const cacheSuccess = cache('1 hour', inSameHour)

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Phishglobe'
    })
})

app.get("/api", cacheSuccess, apiController.index);

const port = process.env.PORT || 5000

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`Server is listening on port ${port}`)
})