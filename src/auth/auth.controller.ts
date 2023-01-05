import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";

@Controller('auth')

export class AuthController{

    constructor(private  authservice:AuthService){
        // this.authservice.test()
    }
    //  POST method call --> auth/signup
        @Post('signup')
        signup() {
            return "I'm signup"
        }
        
        @Post('signin')
        signin(){
            return "I'm signIn"
        }
}



