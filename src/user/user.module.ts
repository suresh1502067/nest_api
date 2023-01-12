import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthuserModule } from 'src/authuser/authuser.module';
import { AuthSchema, AuthUser } from 'src/schema/authuser.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers:[UserService],imports:[ MongooseModule.forFeature([
    {
      name: AuthUser.name,
      schema: AuthSchema
    },
 ])]
})
export class UserModule {}
