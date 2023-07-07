import { Request, Response, Router } from "express";
import UserController from "./controllers/UserController";
import UserService from "./services/UserService";
import RoleService from "./services/RoleService";
import RoleController from "./controllers/RoleController";


const roleService: RoleService = RoleService.getInstance();
const userService: UserService = UserService.getInstance(roleService);

const userController: UserController = new UserController(userService);
const roleController: RoleController = new RoleController(roleService);

const router = Router();

router.post("/users", async (req: Request, res: Response) => {
   await userController.createUser(req, res);
});

router.post("/roles/:roleName", async (req: Request, res: Response) => {
    await roleController.createNew(req, res);
 });

export default router;