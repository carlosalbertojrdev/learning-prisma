import prisma from "../database/Client";
import Role from "../models/Role";

export default class RoleService {

    private static INSTANCE: RoleService;


    private constructor(){}

    static getInstance(): RoleService {
        if (!RoleService.INSTANCE) {
            RoleService.INSTANCE = new RoleService();
        }
        return RoleService.INSTANCE;
    }
    

    async save(roleName: string): Promise<Role> {
        try {
            const role = await prisma.role.create({
                data: {
                    name: roleName,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            })
            return role;
        } catch (error) {
            console.error(error);
            throw new Error("Error to save role");
        }
    }

    async findByRoleName(roleName: string): Promise<Role> {
        try {
            const role = await prisma.role.findFirst({
                where: {
                    name: roleName
                }
            })

            if(role) return role;

            throw new Error("Role not found");
        } catch (error) {
            console.error(error);
            throw new Error("Error to get role by name");
        }
    }

}