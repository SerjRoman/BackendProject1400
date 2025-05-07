import { UserLogin } from "./user.types";
import { UserRepository } from "./user.repository"
import { Result, success } from "../tools/result";

export const UserService = {
    login: async function (data: UserLogin): Promise<Result<string>> {
        const result = await UserRepository.getUser({email: data.email})
        if (result.status === 'error'){
            return result
        }
        // bcrypt
        // jwt token
        return success('token')
    }
}