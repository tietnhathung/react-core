import {Request, Response} from "express-serve-static-core";


class HomeController {
    async index(_req: Request, res: Response) {
        res.json("Home").status(200);
    }
}

export default new HomeController();