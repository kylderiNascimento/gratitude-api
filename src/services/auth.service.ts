import { compare } from 'bcryptjs';
import { UsersRepository } from '@/repositories/users.repository';
import { User } from '@prisma/client';
import { UserNotFoundError } from './error/users/user-not-found-error';
import { AuthInvalidCredentialsError } from './error/auth/auth-invalid-credentials-error';

interface DataServiceRequest {
  email: string;
  password: string;
}

interface DataServiceResponse {
  user: User;
}

export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password, }: DataServiceRequest): Promise<DataServiceResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
        throw new UserNotFoundError();
    }

    const isPasswordEquals = await compare(password, user.password_hash);

    if (!isPasswordEquals) {
        throw new AuthInvalidCredentialsError();
    }

    return {
      user,
    }
  }
}