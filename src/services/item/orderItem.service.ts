import db from "../../../models";
import { Orderitem } from "../../../models/orderitem";
import { NotFoundError } from "../../errors/AppErrors";
import { OrderItemRepository } from "../../repository/item/orderItem.repository";

const orderItemRepository = new OrderItemRepository(db.sequelize);

export class OrderItemService {
  private orderItemRepository: OrderItemRepository;

  constructor(orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }
  async createOrderItem(orderItemData: Partial<Orderitem>): Promise<Orderitem> {
    return orderItemRepository.createOrderItem(orderItemData);
  }
  async getAllOrderItems(): Promise<Orderitem[]> {
    return orderItemRepository.fetchAllOrderItems();
  }
  async getOrderItemById(id: string): Promise<Orderitem | null> {
    const orderItem = await orderItemRepository.fetchOrderItemById(id);
    if (!orderItem) {
      throw new NotFoundError("OrderItem not found");
    }
    return orderItem;
  }
  async updateOrderItem(
    id: string,
    orderItemData: Partial<Orderitem>
  ): Promise<Orderitem> {
    await this.getOrderItemById(id);
    return orderItemRepository.updateOrderItem(id, orderItemData);
  }
  async deleteOrderItem(id: string): Promise<void> {
    return orderItemRepository.deleteOrderItem(id);
  }
}

export const orderItemService = new OrderItemService(orderItemRepository);
