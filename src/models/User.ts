import mongoose,{Schema,Document} from "mongoose";
export interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    avatar?:string;
    isOnline:boolean;
    lastSeen?:Date;
}