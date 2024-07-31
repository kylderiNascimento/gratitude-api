import { PrismaUsersRepository } from "@/repositories/prisma-orm/prisma.users.repository";
import { AuthService } from "../auth.service";


export function factoryAuthService(){
    const usersRepository = new PrismaUsersRepository();
    const authService = new AuthService(usersRepository);

    return authService;
}