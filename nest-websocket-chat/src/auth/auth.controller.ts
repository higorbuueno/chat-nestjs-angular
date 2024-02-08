import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {

    constructor(
        private readonly _authService: AuthService
    ) { }

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    /**
     * This @UseGuards annotation makes it so that every time I access my endpoint, I activate my localStrategy, which takes the request body and validates whether the login is valid
     * So basically, it is run before entering the login endpoint, it already accesses my db and checks if login/email matches and exists.
     * Therefore, when entering the authService.login() function it would basically be to validate again, get permissions, generate JWT and etc...
    */
    @UseGuards(LocalAuthGuard)
    login(@Request() req: AuthRequest) {
        /**
         * This 'req' already passed on the LocalStrategy, that insert user properties inside the 'req', so, I can access user informations in 'req.user'
         * I create a interface to extends Request Express and add 'user' attribute
         */
        return this._authService.login(req.user);
    }
}
