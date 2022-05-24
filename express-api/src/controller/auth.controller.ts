import dataSource from "../db/data-source";
import User from "../entity/user.entity";
import {Repository} from "typeorm/repository/Repository";
import {Request, Response} from "express-serve-static-core";
import BaseController from "./base.controller";
import jwt from "jsonwebtoken"

class AuthController extends BaseController {
    userRepository: Repository<User>

    constructor(userRepository: Repository<User>) {
        super();
        this.userRepository = userRepository;
    }

    async login(req: Request, res: Response) {
        const {name, password} = req.body;
        const user = await userRepository.findOneBy({username:name});
        if (!user) {
            super.errorBuilder(res, "User not found", 401);
        }
        if (user?.password !== password) {
            super.errorBuilder(res, "User not found", 401);
        }
        const payload = { id: user?.id };
        const token = jwt.sign(payload, 'secret');
        return super.jsonBuilder(res, token, 200);
    }
}

const userRepository = dataSource.getRepository(User);

export default new AuthController(userRepository);
