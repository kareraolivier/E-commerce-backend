import { User } from "../../../models/user";
import { Sequelize } from "sequelize";

export const createUserRepository = (sequelize: Sequelize) => {
  const fetchAllUsers = async (): Promise<User[] | any> => {
    try {
      const [results] = await sequelize.query("SELECT * FROM users");
      return results;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  return {
    fetchAllUsers,
  };
};
