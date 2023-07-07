import { Request, Response } from "express";
import UserInput from "../payload/UserInput";
import UserService from "../services/UserService";

export default class UserController {

    constructor(private readonly userService: UserService) { }

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const input: UserInput = req.body;
            const user = await this.userService.save(input);
            return res.json(user).status(201);
        } catch (error) {
            console.error(error);
            throw new Error("Error to process saving user");
        }
    }

}