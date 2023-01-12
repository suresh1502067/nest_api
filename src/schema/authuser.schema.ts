import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document,now} from 'mongoose'

export type AuthUserDocument = AuthUser & Document

@Schema()
export class AuthUser{

    @Prop({required:true})
    email: string

    @Prop()
    password: String

  
    @Prop({default: now()})
    createdAt?: Date;


}

export const AuthSchema = SchemaFactory.createForClass(AuthUser)