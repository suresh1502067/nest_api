import { Module } from '@nestjs/common';
import { AuthuserService } from './authuser.service';
import { AuthuserController } from './authuser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema, AuthUser } from 'src/schema/authuser.schema';
import { JwtModule } from '@nestjs/jwt';
import { JWtStrategy } from 'src/strategy';

@Module({
  controllers: [AuthuserController],
  providers: [AuthuserService,JWtStrategy],
  imports: [
    MongooseModule.forFeature([
       {
         name: AuthUser.name,
         schema: AuthSchema
       },
    ]),
    JwtModule.register({
    }),
   ],
  //  exports:[AuthuserService]
})
export class AuthuserModule {}
