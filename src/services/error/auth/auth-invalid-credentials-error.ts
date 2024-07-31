export class AuthInvalidCredentialsError extends Error {
    constructor() {
      super('Invalid Credentials.')
    }
}