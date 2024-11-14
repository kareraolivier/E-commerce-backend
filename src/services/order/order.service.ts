import db from "../../../models";
import { Order } from "../../../models/order";
import { NotFoundError } from "../../errors/AppErrors";
import { OrderRepository } from "../../repository/order/order.repository";
import { IOrder } from "./order";

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

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const order = await orderRepository.createOrder(orderData);
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
