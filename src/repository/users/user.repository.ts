import { User } from "../../../models/user";
import { Sequelize, QueryTypes } from "sequelize";

export class UserRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async fetchAllUsers(): Promise<User[]> {
    try {
      const [results] = await this.sequelize.query("SELECT * FROM users");

      return results as User[];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  createUser = async (userData: Partial<User>): Promise<any> => {
    try {
      const [result] = await this.sequelize.query(
        `INSERT INTO users (firstName, lastName, email) VALUES (:firstName, :lastName, :email) RETURNING *`,
        {
          replacements: userData,
          type: QueryTypes.INSERT,
        }
      );
      return result ? result : null;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };
}
