import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';
import { UnauthorizedError } from './errors/unauthorized.error';

@Injectable()
export class AuthService {

    constructor(
        private _userService: UserService,
        private _jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this._userService.findByEmail(email);

        // Check if user exists
        if (user) {
            // Check if provided password matches with db password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined
                };
            }
        }

        throw new UnauthorizedError("Email e/ou senha incorretos");
    }

    login(user: User): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name
        }
        const jwtToken = this._jwtService.sign(payload);
        return {
            access_token: jwtToken
        };
    }
}
