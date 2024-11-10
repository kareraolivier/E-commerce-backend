import { v4 as uuidv4 } from "uuid";
import { Model, Sequelize } from "sequelize";

export class Product extends Model {
  public id!: string;
  public title!: string;
  public imageUrl!: string;
  public description!: string;
  public price!: string;
  public categoryId!: string;
  public isDeleted!: boolean;
  public isAvailable!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    Product.belongsToMany(models.Category, {
      through: "ProductCategory",
      as: "categories",
    });
    Product.hasMany(models.Review, {
      foreignKey: "productId",
      as: "reviews",
    });
  }
}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: DataTypes.STRING,
      price: DataTypes.STRING,
      categoryId: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      isAvailable: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "Products",
    }
  );
  return Product;
};
