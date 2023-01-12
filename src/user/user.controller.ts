import { Controller, ForbiddenException, Get, Req, Res, UseGuards } from '@nestjs/common';

import { Request } from 'express';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
    constructor(private userservice: UserService) { }
    // GET /user/me
    //  @UseGuards(AuthGuard('jwt')) // the string "jwt" that must be equal to what u want to pass the "jwt.strategy.ts" file.
    @Get('me')
    getme(@Req() req: Request) {
        try {
            const data: { email: string, sub: string } = req.body['userObj']
            return this.userservice.findOne(data.sub)
        }
        catch (err) {
            throw new ForbiddenException(err)
        }
    }
}


// In our case, we want to block the user/me API with use of the "guards"