import dataSource from "../db/data-source";
import User from "../entity/user.entity";
import {Repository} from "typeorm/repository/Repository";
import {Request, Response} from "express-serve-static-core";
import jwt from "jsonwebtoken"
import {errorBuilder, jsonBuilder} from "../helper/response.helper";

class AuthController {
    userRepository: Repository<User>

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async login(req: Request, res: Response) {
        const user = req.user;
        if (user && "id" in user && "username" in user) {
            const payload = {
                id: user["id"],
                username: user["username"],
            }
            const token = jwt.sign(payload, 'secret');
            return jsonBuilder(res, token);
        }
        return errorBuilder(res, "User not found", 401);
    }
}

const userRepository = dataSource.getRepository(User);

export default new AuthController(userRepository);
