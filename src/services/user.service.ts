import { UsersRepository } from '@/repositories/users.repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './error/users/user-already-exists-error';

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class UserService {

    private usersRepository: UsersRepository;

    constructor(usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    async create({ name, email, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6);

        // Verificando se já existe o user
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.usersRepository.create({
            name,
            email,
            password_hash,
        });

        return user;
    }


}