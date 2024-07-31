import { PrismaUsersRepository } from "@/repositories/prisma-orm/prisma.users.repository";
import { UserService } from "../user.service";


export function factoryUserRegisterService(){
    const usersRepository = new PrismaUsersRepository();
    const registerService = new UserService(usersRepository);

    return registerService;
}