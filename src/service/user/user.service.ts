import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { CreateStudentDto } from 'src/dto/create-student.dto';
import { IUser } from 'src/interface/user.interface';
import { Model } from "mongoose";
// import { UpdateStudentDto } from 'src/dto/update-student.dto';
@Injectable()
export class UserService {
constructor(@InjectModel('User') private userModel:Model<IUser>) { }
async createUser(user: object): Promise<IUser> {
   const newUser = new this.userModel(user);
   return await newUser.save();
}
async updateUser(userId: string, updateUser: object): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUser, { new: true });
   if (!existingUser) {
     throw new NotFoundException(`User #${userId} not found`);
   }
   return existingUser;
}
async getAllUsers(): Promise<IUser[]> {
    const usersData = await this.userModel.find();
    if (!usersData || usersData.length == 0) {
        throw new NotFoundException('Users data not found!');
    }
    return usersData;
}
async getUserByEmail(emailId: string): Promise<IUser> {
    const userDetail = await this.userModel.findOne({ emailId }).exec();
    if(!userDetail) {
        return null
    }
    return userDetail;
}
async getUserByID(userId: string): Promise<IUser> {
   const existingUser = await this.userModel.findById(userId).exec();
   if (!existingUser) {
    throw new NotFoundException(`User #${userId} not found`);
   }
   return existingUser;
}
async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
   if (!deletedUser) {
     throw new NotFoundException(`User #${userId} not found`);
   }
   return deletedUser;
}
}