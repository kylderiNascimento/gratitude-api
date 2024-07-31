import { PrismaUsersRepository } from "@/repositories/prisma-orm/prisma.user.repository";
import { RegisterService } from "../user.service";


export function factoryUserRegisterService(){
    const usersRepository = new PrismaUsersRepository();
    // Inversion Dependency 
    const registerService = new RegisterService(usersRepository);

    return registerService;
}