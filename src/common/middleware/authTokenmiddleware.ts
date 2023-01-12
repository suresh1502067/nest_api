import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenCheckMidddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService
    ) { }
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request...', req.headers['authorization']);
        let authToken = req.headers['authorization']
        let authObj: any = this.jwtService.decode(authToken.split(' ')[1])
        if (authObj?.email) {
            req.body['userObj'] = authObj;
            next();
        } else {
            new ForbiddenException("Token is not correct")
        }
    }
}
