import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


@Module({ // @ means annotated, module decorator means it's just a function and we can add some data to current class or function. 
  imports: [AuthModule, UserModule],

})
export class AppModule {}  // Application module...

// It's main module or the app that will import other module, 
// It's similar to somthing that we have in react where we have in app.js
