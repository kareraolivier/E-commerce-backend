import { User } from "../../models/user";
import {
  ValidationError,
  InternalServerError,
  UnauthorizedError,
} from "../errors/AppErrors";
import { UserRepository } from "../repository/users/user.repository";
import { sequelize } from "../sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create an instance of UserRepository
const userRepository = new UserRepository(sequelize);
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export class UserAuthService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.userRepository.fetchUserByEmail(email);
      if (!user) {
        throw new ValidationError("Invalid email or password");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new ValidationError("Invalid email or password");
      }
      if (!user.isActive) {
        throw new UnauthorizedError("User is not active");
      }
      const token = jwt.sign({ ...user }, JWT_SECRET, {
        expiresIn: "1d",
      });
      return token;
    } catch (error) {
      console.error("Error in login:", error);
      throw new InternalServerError("Error in login:");
    }
  }

  async getLogedInUser(req: any): Promise<any> {
    const token = req.header("Authorization");
    if (!token)
      throw new UnauthorizedError("Access denied. No token provided.");
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      throw new UnauthorizedError("Access denied. Invalid token.");
    }
  }
}

export const userAuthService = new UserAuthService(userRepository);
