import { log } from "console";
import prisma from "../database/Client";
import Role from "../models/Role";
import User from "../models/User";
import UserInput from "../payload/UserInput";
import RoleService from "./RoleService";

export default class UserService {

    private static INSTANCE: UserService;

    private constructor(private readonly roleService: RoleService){}

    static getInstance(roleService: RoleService): UserService {
        if (!UserService.INSTANCE) {
            UserService.INSTANCE = new UserService(roleService);
        }
        return UserService.INSTANCE;
    }


    async save(input: UserInput): Promise<User> {
        try {
            const role: Role = await this.roleService.findByRoleName(input.roleName);

            const user: User = await prisma.user.create({
                data: {
                    name: input.name,
                    email: input.email,
                    role_id: role.id,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            })

            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Error to save user");
        }
    }
    
}