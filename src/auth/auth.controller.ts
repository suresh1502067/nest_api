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
            return this.authservice.signup()
        }
        
        @Post('signin')
        signin(){
            return this.authservice.signin()
        }
}


// In controller, We might check body request request if needed.
// Or If might to check any header or any other business login, you can utlize this controller page.
 
