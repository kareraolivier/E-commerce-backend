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
    await userService.getUserById(orderData.userId);
    const order = await orderRepository.createOrder(orderData);
    return order;
  }
  async createCheckoutOrder(orderData: ICheckoutOrder): Promise<Order> {
    await userService.getUserById(orderData.userId);

    const { items, ...newOrderData } = orderData;
    const order = await orderRepository.createOrder(newOrderData);

    await Promise.all(
      items.map((item: Omit<IOrderItem, "orderId">) =>
        orderItemService.createOrderItem({
          ...item,
          orderId: Array.isArray(order) ? order[0].id : order.id,
        } as Orderitem)
      )
    );
    return order;
  }

  async updateOrder(id: string, orderData: Partial<Order>): Promise<Order> {
    const order = await orderRepository.fetchOrderById(id);
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    await orderRepository.updateOrder(id, orderData);
    return order;
  }

  async deleteOrder(id: string): Promise<void> {
    const order = await orderRepository.fetchOrderById(id);
    if (!order) {
      throw new NotFoundError("Order not found");
    }
    await orderRepository.deleteOrder(id);
  }
}

export const orderService = new OrderService(orderRepository);
