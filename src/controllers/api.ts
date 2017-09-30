import { Response, Request } from "express";

export let index = (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Phishglobe API'
    })
}