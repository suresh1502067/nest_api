import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthUser, AuthUserDocument } from "src/schema/authuser.schema";



@Injectable()
export class UserService {
    constructor(@InjectModel(AuthUser.name) private authUserModel: Model<AuthUserDocument>) { }
    async findOne(id: string) {
            let currentUserD=await this.authUserModel.findOne({_id:id});
            return currentUserD

    }
}