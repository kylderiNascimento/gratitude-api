import { PrismaUsersRepository } from "@/repositories/prisma-orm/prisma.user.repository";
import { UserService } from "../user.service";


export function factoryUserRegisterService(){
    const usersRepository = new PrismaUsersRepository();
    const registerService = new UserService(usersRepository);

    return registerService;
}