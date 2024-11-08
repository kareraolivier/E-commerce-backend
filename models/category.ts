import { v4 as uuidv4 } from "uuid";
import { Model, Sequelize, DataTypes } from "sequelize";

export class Category extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
  public isDeleted!: boolean;
  public isActive!: string;

  /**
   *
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    Category.belongsToMany(models.Product, {
      through: "ProductCategory",
      as: "products",
    });
  }
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      isDeleted: DataTypes.BOOLEAN,
      isActive: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Category",
    }
  );
  return Category;
};
