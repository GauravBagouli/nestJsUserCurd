import { Document } from 'mongoose';
export interface IUser extends Document{
    readonly name: string;
    readonly age: number;
    readonly email: string;
    readonly phone_no: number;
}