import { Orderitem } from "../../../models/orderitem";
import { Sequelize, QueryTypes, Transaction } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { updateRecord } from "../../helpers/update.query";

export class OrderItemRepository {
  private sequelize: Sequelize;
  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async fetchAllOrderItems(): Promise<Orderitem[]> {
    const orderItems = await this.sequelize.query("SELECT * FROM Orderitems", {
      type: QueryTypes.SELECT,
    });
    return orderItems as Orderitem[];
  }

  async fetchOrderItemById(id: string): Promise<Orderitem | null> {
    const orderItem = await this.sequelize.query(
      'SELECT * FROM "Orderitems" WHERE "id" = :id',
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    return (orderItem[0] as Orderitem) || null;
  }

  async createOrderItem(
    orderItemData: Partial<Orderitem>,
    transaction?: Transaction
  ): Promise<Orderitem> {
    const id = uuidv4();
    const [orderItem] = await this.sequelize.query(
      'INSERT INTO "Orderitems" ("id", "orderId", "productId", "quantity", "createdAt", "updatedAt") VALUES (:id, :orderId, :productId, :quantity, :createdAt, :updatedAt) RETURNING *;',
      {
        replacements: {
          id,
          ...orderItemData,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        type: QueryTypes.INSERT,
        transaction,
      }
    );
    return orderItem as unknown as Orderitem;
  }

  async updateOrderItem(
    id: string,
    orderItemData: Partial<Orderitem>,
    transaction?: Transaction
  ): Promise<Orderitem> {
    const updatedOrderItem = await updateRecord<Orderitem>(
      this.sequelize,
      "Orderitems",
      id,
      orderItemData,
      transaction
    );
    return updatedOrderItem as Orderitem;
  }

  async deleteOrderItem(id: string): Promise<void> {
    await this.sequelize.query('DELETE FROM "Orderitems" WHERE "id" = :id', {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  }
}
