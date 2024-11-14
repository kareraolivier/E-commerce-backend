import { v4 as uuidv4 } from "uuid";
import { Model } from "sequelize";

export class Review extends Model {
  public id!: string;
  public productId!: string;
  public userId!: string;
  public rating!: number;
  public comment!: string;
  public isDeleted!: boolean;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Review.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Review.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  }
}
module.exports = (sequelize, DataTypes) => {
  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      productId: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "Reviews",
    }
  );
  return Review;
};
