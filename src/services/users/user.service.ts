import { User } from "../../../models/user";
import { createUserRepository } from "../../repository/users/user";
import { sequelize } from "../../sequelize";

// Create a User Repository instance
const userRepository = createUserRepository(sequelize);

// Fetch all users function
export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await userRepository.fetchAllUsers();
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw error; // Rethrow the error for higher-level handling
  }
};

// Additional service functions can be added here
export const createUser = async (userData: Partial<User>): Promise<any> => {
  // Implement createUser logic here, e.g., calling a repository method
  // You would need to implement a createUser method in the repository
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<any> => {
  // Implement updateUser logic here
};

export const deleteUser = async (id: number): Promise<void> => {
  // Implement deleteUser logic here
};
