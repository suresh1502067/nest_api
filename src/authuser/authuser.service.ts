import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUserDocument, AuthUser } from 'src/schema/authuser.schema';
import { CreateAuthuserDto } from './dto/create-authuser.dto';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthuserService {

  constructor(@InjectModel(AuthUser.name) private authUserModel: Model<AuthUserDocument>, private config: ConfigService,
    private jwt: JwtService) { }

  async create(createAuthuserDto: CreateAuthuserDto): Promise<AuthUserDocument> {
    try {
      const user: CreateAuthuserDto = await this.authUserModel.findOne({ email: createAuthuserDto?.email });
      if (user) {
        // const match = await bcrypt.compare(createAuthuserDto?.password, user?.password);
        throw new ForbiddenException("Creadtional Already Exist!")
      } else {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(createAuthuserDto.password, salt);
        createAuthuserDto.password = hashPassword;
        const cUser = new this.authUserModel(createAuthuserDto)
        return cUser.save()
      }
    } catch (e) {
      return e
    }
  }

  // findAll() {
  //   return `This action returns all authuser`;
  // }

  async findOne(id: string): Promise<AuthUserDocument> {

    try {
      const user = await this.authUserModel.findOne({ _id: id });
      return user
    } catch (err) {
      return err
    }
  }
  async signin(user: CreateAuthuserDto): Promise<{access_token:string}> {

    try {

      const { email, password } = user

      const userD: any = await this.authUserModel.findOne({ email });
      if (!userD) {
        throw new ForbiddenException('Creadtional is incorrect');
      }
      const matchUser = await bcrypt.compare(password, userD?.password);
      console.log("userD", matchUser)
      if (!matchUser) {
        throw new ForbiddenException('Password is incorrect');
      }
      let token =await this.signToken(userD?._id,userD?.email)
      return {
        access_token:token
      }

      // return userD
    } catch (err) {
      return err
    }
  }

  async signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    }
    let jwt_secret = this.config.get('JWT_SECRET')
    return await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: jwt_secret
    })

  }

  // update(id: number, updateAuthuserDto: UpdateAuthuserDto) {
  //   return `This action updates a #${id} authuser`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} authuser`;
  // }
}
