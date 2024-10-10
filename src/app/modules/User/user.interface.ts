/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  _id?: string;
  name: string;
  role: "ADMIN" | "USER"; // Set role as required with literal types
  email: string;
  password: string;
  status: "ACTIVE" | "BLOCKED"; // Set status as required with literal types
  mobileNumber?: string;
  following: string[];
  follower: string[];
  profilePhoto?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface IUserModel extends Model<TUser> {
  // Instance methods for checking if the user exists
  isUserExistsByCustomId(id: string): Promise<TUser>;
  // Instance methods for checking if the user exists by email
  isUserExistsByEmail(email: string): Promise<TUser>;
  // Instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUpdateUser = {
  name: string;
  phone: string;
  address: string;
};
