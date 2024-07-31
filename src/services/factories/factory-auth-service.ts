import { PrismaUsersRepository } from "@/repositories/prisma-orm/prisma.user.repository";
import { AuthService } from "../auth.service";


export function factoryAuthService(){
    const usersRepository = new PrismaUsersRepository();
    const authService = new AuthService(usersRepository);

    return authService;
}