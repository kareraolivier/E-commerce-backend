import { User } from "../../../models/user";
import { Sequelize, QueryTypes } from "sequelize";

export class UserRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async fetchAllUsers(): Promise<User[]> {
    try {
      const results = await this.sequelize.query(
        'SELECT id, "firstName", "lastName", email, "createdAt", "updatedAt" FROM "Users"',
        {
          type: QueryTypes.SELECT,
        }
      );

      return results as User[];
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async createUser(userData: Partial<User>): Promise<any> {
    const { firstName, lastName, email } = userData;
    try {
      const result = await this.sequelize.query(
        `INSERT INTO "Users" ("firstName", "lastName", "email", "createdAt", "updatedAt") VALUES (:firstName, :lastName, :email, :createdAt, :updatedAt) RETURNING *`,
        {
          replacements: {
            firstName,
            lastName,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          type: QueryTypes.INSERT,
        }
      );
      return result || null;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}
