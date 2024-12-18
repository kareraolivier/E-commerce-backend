import {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
} from "../errors/AppErrors";
import { UserRepository } from "../repository/users/user.repository";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../models";

dotenv.config();

interface DecodedToken extends JwtPayload {
  loggedInUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
// Create an instance of UserRepository
const userRepository = new UserRepository(db.sequelize);
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
        throw new NotFoundError("Invalid email or password");
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new ValidationError("Invalid email or password");
      }
      if (!user.isActive) {
        throw new UnauthorizedError("User is not active");
      }

      const loggedInUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
      const token = jwt.sign(loggedInUser, JWT_SECRET, {
        expiresIn: "1d",
      });
      return token;
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  }

  async getLoggedInUser(req: any): Promise<DecodedToken> {
    try {
      const authHeader = req.header("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Access denied. No token provided.");
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;
      if (!decoded) {
        throw new UnauthorizedError("Invalid token structure.");
      }

      return decoded;
    } catch (error) {
      throw new UnauthorizedError("Access denied. Invalid token.");
    }
  }
}

export const userAuthService = new UserAuthService(userRepository);
