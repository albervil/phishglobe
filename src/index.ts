import * as express from "express";
import * as apiController from "./controllers/api"

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Phishglobe'
    })
})

app.get("/api", apiController.index);

const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }

    return console.log(`Server is listening on port ${port}`)
})