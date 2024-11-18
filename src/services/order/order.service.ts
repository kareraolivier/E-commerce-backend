import db from "../../../models";
import { Order } from "../../../models/order";
import { Orderitem } from "../../../models/orderitem";
import { BadRequestError, NotFoundError } from "../../errors/AppErrors";
import { OrderRepository } from "../../repository/order/order.repository";
import { getIO } from "../../socketServer";
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
    try {
      await userService.getUserById(orderData.userId);
      const order = await orderRepository.createOrder(orderData);
      return order;
    } catch (error) {
      throw error;
    }
  }
  async createCheckoutOrder(orderData: ICheckoutOrder): Promise<Order> {
    try {
      await userService.getUserById(orderData.userId);

      const { items, ...newOrderData } = orderData;

      const total = items.reduce((acc, item) => acc + Number(item.amount), 0);
      if (!(Number(newOrderData.totalAmount) === total)) {
        throw new BadRequestError(
          "Total amount does not match order items total"
        );
      }

      const order = await orderRepository.createOrder(newOrderData);
      await Promise.all(
        items.map((item: Omit<IOrderItem, "orderId">) =>
          orderItemService.createOrderItem({
            ...item,
            orderId: Array.isArray(order) ? order[0].id : order.id,
          } as Orderitem)
        )
      );

      // --------------------socket message----------------------
      // const io = getIO();
      // io.emit("orderCreated", {
      //   message: "A new order has been created!",
      //   order,
      // });

      return order;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
    try {
      await this.getOrderById(id);
      const order = await orderRepository.updateOrder(id, orderData);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(id: string): Promise<void> {
    await this.getOrderById(id);
    return await orderRepository.deleteOrder(id);
  }
}

export const orderService = new OrderService(orderRepository);
