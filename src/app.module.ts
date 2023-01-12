import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthuserModule } from './authuser/authuser.module';
import { AuthService } from './auth/auth.services';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JWtStrategy } from './strategy';
import { StrategyModel } from './strategy/strategy.module';
import { TokenCheckMidddleware } from './common/middleware/authTokenmiddleware';
import { JwtService } from '@nestjs/jwt';


@Module({ // @ means annotated, module decorator means it's just a function and we can add some data to current class or function. 
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRoot('mongodb://localhost:27017'),
    AuthModule, AuthuserModule, UserModule],
    providers:[AuthService,StrategyModel,JwtService],
    controllers:[AuthController],exports:[AuthuserModule]

})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenCheckMidddleware).exclude('/authuser/(.*)').forRoutes('*')
  }

}  // Application module...

// It's main module or the app that will import other module, 
// It's similar to somthing that we have in react where we have in app.js
