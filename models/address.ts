import { v4 as uuidv4 } from "uuid";
import { Model } from "sequelize";

export class Address extends Model {
  public id!: string;
  public street!: string;
  public city!: string;
  public state!: string;
  public zipCode!: string;
  public country!: string;
  public userId!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Address.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
}
module.exports = (sequelize: any, DataTypes: any) => {
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      country: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "Addresses",
    }
  );
  return Address;
};
