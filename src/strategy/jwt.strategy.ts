import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthuserService } from "src/authuser/authuser.service";


@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private config:ConfigService,private authuser:AuthuserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
          });
    }

   async validate(payload:{sub:string,email:string}){
       
       const userD: any = await this.authuser.findOne(payload.sub);
       console.log("payload-----------",userD)
        return {payload,...userD}
    }

}