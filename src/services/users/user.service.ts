import db from "../../../models";
import { User } from "../../../models/user";
import {
  ValidationError,
  ConflictError,
  NotFoundError,
} from "../../errors/AppErrors";
import { UserRepository } from "../../repository/users/user.repository";
import bcrypt from "bcrypt";

// Create an instance of UserRepository
const userRepository = new UserRepository(db.sequelize);

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.fetchAllUsers();
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.fetchUserById(id);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error in getUserById:", error);
      throw error;
    }
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      if (!userData.email) {
        throw new ValidationError("Email is required");
      }

      const existingUser = await this.userRepository.fetchUserByEmail(
        userData.email
      );
      if (existingUser) {
        console.log("existing user", existingUser);
        throw new ConflictError("User with this email already exists");
      }

      if (!userData.password) {
        throw new ValidationError("Password is required");
      }
      const user = {
        ...userData,
        password: await bcrypt.hash(userData.password, 10),
      };
      return await this.userRepository.createUser(user);
    } catch (error) {
      console.error("Error in createUser:", error);
      throw error;
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<any> {
    try {
      return await this.userRepository.updateUser(id, userData);
    } catch (error) {
      console.error("Error in updateUser:", error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      console.error("Error in deleteUser:", error);
      throw error;
    }
  }
}

// Exporting an instance of the service for use in the controller
export const userService = new UserService(userRepository);
