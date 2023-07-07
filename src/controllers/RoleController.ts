import { Request, Response } from "express";
import RoleService from "../services/RoleService";

export default class RoleController {

    constructor(private readonly roleService: RoleService) { }

    async createNew(req: Request, res: Response): Promise<Response> {
        try {
            const role = await this.roleService.save(req.params.roleName);
            return res.send(role).status(201);
        } catch (error) {
            console.error(error);
            throw new Error("Erro to process saving new role");
        }
    }

}