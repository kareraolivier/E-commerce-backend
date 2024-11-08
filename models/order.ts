import { v4 as uuidv4 } from "uuid";
import { Model } from "sequelize";
export class Order extends Model {
  public id!: string;
  public date!: string;
  public totalAmount!: string;
  public status!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Order.hasMany(models.OrderItem, {
      foreignKey: "orderId",
      as: "orderItems",
    });
  }
}
module.exports = (sequelize, DataTypes) => {
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
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
    }
  );
  return Order;
};
