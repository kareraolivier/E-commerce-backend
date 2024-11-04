import { User } from "../../../models/user";
import { UserRepository } from "../../repository/users/user.repository";
import { sequelize } from "../../sequelize";

// Create an instance of UserRepository
const userRepository = new UserRepository(sequelize);

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

  async createUser(userData: Partial<User>): Promise<any> {
    // Implement createUser logic using userRepository
  }

  async updateUser(id: number, userData: Partial<User>): Promise<any> {
    // Implement updateUser logic using userRepository
  }

  async deleteUser(id: number): Promise<void> {
    // Implement deleteUser logic using userRepository
  }
}

// Exporting an instance of the service for use in the controller
export const userService = new UserService(userRepository);
