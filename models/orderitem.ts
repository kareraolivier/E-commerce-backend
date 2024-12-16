import { v4 as uuidv4 } from "uuid";
import { Model } from "sequelize";

export class Orderitem extends Model {
  public id!: string;
  public quantity!: number;
  public productId!: string;
  public orderId!: string;
  public amount!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Orderitem.belongsTo(models.Order, {
      foreignKey: "orderId",
      as: "order",
    });
    Orderitem.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  }
}
module.exports = (sequelize: any, DataTypes: any) => {
  Orderitem.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      quantity: DataTypes.STRING,
      productId: DataTypes.STRING,
      orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      amount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Orderitem",
      tableName: "Orderitems",
    }
  );
  return Orderitem;
};
