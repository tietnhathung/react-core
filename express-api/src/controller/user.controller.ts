import {Repository} from "typeorm/repository/Repository";
import {Request, Response} from "express-serve-static-core";
import User from "../entity/user.entity";
import dataSource from "../db/data-source";
import BaseController from "./base.controller";

class UserController extends BaseController{
    userRepository: Repository<User>

    constructor(userRepository: Repository<User>) {
        super();
        this.userRepository = userRepository;
    }

    async index(_req: Request, res: Response) {
        const users = await userRepository.find();
        return super.jsonBuilder(res,users,200);
    }
}

const userRepository = dataSource.getRepository(User);

export default new UserController(userRepository);
