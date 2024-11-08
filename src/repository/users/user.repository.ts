import { User } from "../../../models/user";
import { Sequelize, QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { updateRecord } from "../../helpers/update.query";
export class UserRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async fetchAllUsers(): Promise<User[]> {
    try {
      const results = await this.sequelize.query(
        'SELECT "id", "firstName", "lastName", "email", "createdAt", "updatedAt", "isActive" FROM "Users" ORDER BY id desc',
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

  async fetchUserById(id: string): Promise<any> {
    try {
      const result = await this.sequelize.query(
        'SELECT "id", "firstName", "lastName", "email", "createdAt", "updatedAt", "isActive" FROM "Users" WHERE "id" = :id',
        {
          replacements: { id },
          type: QueryTypes.SELECT,
        }
      );
      return result[0] || null;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  }

  async fetchUserByEmail(email: string): Promise<any> {
    try {
      const result = await this.sequelize.query(
        'SELECT * FROM "Users" WHERE "email" = :email',
        {
          replacements: { email },
          type: QueryTypes.SELECT,
        }
      );
      return result[0] || null;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  }

  async createUser(userData: Partial<User>): Promise<any> {
    const { firstName, lastName, email, password } = userData;
    try {
      const result = await this.sequelize.query(
        `INSERT INTO "Users" ("id", "firstName", "lastName", "email", "password", "isActive", "createdAt", "updatedAt") VALUES (:id, :firstName, :lastName, :email, :password, :isActive, :createdAt, :updatedAt) RETURNING "id", "firstName", "lastName", "email", "isActive", "createdAt", "updatedAt"`,
        {
          replacements: {
            id: uuidv4(),
            firstName,
            lastName,
            email,
            password,
            isActive: true,
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

  async updateUser(id: string, userData: Partial<User>): Promise<any> {
    return await updateRecord<User>(this.sequelize, "Users", id, userData);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.sequelize.query('DELETE FROM "Users" WHERE "id" = :id', {
        replacements: { id },
        type: QueryTypes.DELETE,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
}
