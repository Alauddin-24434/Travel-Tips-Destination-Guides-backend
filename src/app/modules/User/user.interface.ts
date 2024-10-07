/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';

export type TUser = {
  _id?: string;
  name: string;
  role: keyof typeof USER_ROLE;
  email: string;
  password: string;
  status: keyof typeof USER_STATUS;
  mobileNumber?: string;
  profilePhoto?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
//instance methods for checking if the user exist
isUserExistsByEmail(email: string): Promise<TUser>;
//instance methods for checking if passwords are matched
isPasswordMatched(
  plainTextPassword: string,
  hashedPassword: string,
): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;



export type TUpdateUser={

name:string;
phone:string;
address:string;

}