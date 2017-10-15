import * as express from "express";
import * as apiController from "./controllers/api"
import * as compression from "compression";
import * as cors from "cors";

const app = express();
app.use(compression());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Phishglobe'
    })
})

app.get("/api", cors(), apiController.index);

const port = process.env.PORT || 5000

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`Server is listening on port ${port}`)
})
