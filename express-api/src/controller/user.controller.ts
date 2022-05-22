import {Repository} from "typeorm/repository/Repository";
import {Request, Response} from "express-serve-static-core";
import User from "../entity/user.entity";
import dataSource from "../db/data-source";

class UserController {
    userRepository: Repository<User>

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async index(_req: Request, res: Response) {
        console.log("ss")
        const users = await userRepository.find();
        res.json(users).status(200);
    }
}

const userRepository = dataSource.getRepository(User);

export default new UserController(userRepository);