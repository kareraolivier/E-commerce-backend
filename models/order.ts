import { v4 as uuidv4 } from "uuid";
import { Model } from "sequelize";
export class Order extends Model {
  public id!: string;
  public date!: string;
  public totalAmount!: string;
  public status!: string;
  public userId!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
      as: "orderItems",
    });
  }
}
module.exports = (sequelize: any, DataTypes: any) => {
  Order.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      date: DataTypes.STRING,
      totalAmount: DataTypes.STRING,
      status: DataTypes.STRING,
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
      modelName: "Order",
      tableName: "Orders",
    }
  );
  return Order;
};
