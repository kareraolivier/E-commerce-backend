import { Order } from "../../../models/order";
import { Sequelize, QueryTypes, Transaction } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { updateRecord } from "../../helpers/update.query";

export class OrderRepository {
  private sequelize: Sequelize;
  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }
  async fetchAllOrders(): Promise<Order[]> {
    const orders = await this.sequelize.query(
      'SELECT * FROM "Orders" ORDER BY id desc',
      {
        type: QueryTypes.SELECT,
      }
    );
    return orders as Order[];
  }

  async fetchOrderById(id: string): Promise<Order | null> {
    const order = await this.sequelize.query(
      'SELECT * FROM "Orders" WHERE "id" = :id',
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    return (order[0] as Order) || null;
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const id = uuidv4();
    const order = await this.sequelize.query(
      'INSERT INTO "Orders" ("id", "userId", "date", "totalAmount", "status", "createdAt", "updatedAt") VALUES (:id, :userId, :date, :totalAmount, :status, :createdAt, :updatedAt) RETURNING *',
      {
        replacements: {
          id,
          ...orderData,
          date: orderData.date || new Date().toISOString(),
          status: orderData.status || "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        type: QueryTypes.INSERT,
      }
    );
    return order[0] as unknown as Order;
  }

  async updateOrder(id: string, orderData: Partial<Order>) {
    const order = await updateRecord(this.sequelize, "Orders", id, orderData);
    return order as Order;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.sequelize.query('DELETE FROM "Orders" WHERE "id" = :id', {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  }
}
