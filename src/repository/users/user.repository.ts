import { User } from "../../../models/user";
import { Sequelize } from "sequelize";

export class UserRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async fetchAllUsers(): Promise<User[] | any> {
    try {
      const [results] = await this.sequelize.query("SELECT * FROM users");
      return results;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  // Other repository methods like createUser, updateUser, deleteUser, etc.
}
