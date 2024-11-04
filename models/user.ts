import { Model, DataTypes, Sequelize } from "sequelize";

export class User extends Model {
  public firstName!: string;
  public lastName!: string;
  public email!: string;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // Define association here
  }
}

// Initialize the User model
export const initializeUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Optionally, you can enforce uniqueness for email
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );

  return User;
};
