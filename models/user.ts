import { Model, DataTypes, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

export class User extends Model {
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password?: string;
  public imageUrl?: string;
  public isActive?: boolean;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    User.hasOne(models.Address, { foreignKey: "userId", as: "address" });
    User.hasMany(models.Review, { foreignKey: "userId", as: "reviews" });
  }
}
module.exports = (sequelize: Sequelize) => {
  // Initialize the User model
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
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
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      timestamps: true,
    }
  );

  return User;
};
