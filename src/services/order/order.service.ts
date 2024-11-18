import db from "../../../models";
import { Order } from "../../../models/order";
import { Orderitem } from "../../../models/orderitem";
import { NotFoundError } from "../../errors/AppErrors";
import { OrderRepository } from "../../repository/order/order.repository";
import { orderItemService } from "../item/orderItem.service";
import { userService } from "../users/user.service";
import { ICheckoutOrder, IOrderItem } from "./order";

const orderRepository = new OrderRepository(db.sequelize);
export class OrderService {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await orderRepository.fetchAllOrders();
    return orders;
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order = await orderRepository.fetchOrderById(id);
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    return order;
  }

  async createOrder(orderData: Order): Promise<Order> {
    const transaction = await db.sequelize.transaction();
    try {
      await userService.getUserById(orderData.userId);
      const order = await orderRepository.createOrder(orderData, transaction);
      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  async createCheckoutOrder(orderData: ICheckoutOrder): Promise<Order> {
    const transaction = await db.sequelize.transaction();
    try {
      await userService.getUserById(orderData.userId);

      const { items, ...newOrderData } = orderData;
      const order = await orderRepository.createOrder(
        newOrderData,
        transaction
      );

      await Promise.all(
        items.map(
          (item: Omit<IOrderItem, "orderId">) =>
            orderItemService.createOrderItem({
              ...item,
              orderId: Array.isArray(order) ? order[0].id : order.id,
            } as Orderitem),
          transaction
        )
      );

      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
    const transaction = await db.sequelize.transaction();
    try {
      await this.getOrderById(id);
      const order = await orderRepository.updateOrder(
        id,
        orderData,
        transaction
      );
      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async deleteOrder(id: string): Promise<void> {
    await this.getOrderById(id);
    return await orderRepository.deleteOrder(id);
  }
}

export const orderService = new OrderService(orderRepository);
