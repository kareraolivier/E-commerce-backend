import db from "../../../models";
import { Orderitem } from "../../../models/orderitem";
import { NotFoundError } from "../../errors/AppErrors";
import { OrderItemRepository } from "../../repository/item/orderItem.repository";
import { orderService } from "../order/order.service";
import { productService } from "../product/product.service";

const orderItemRepository = new OrderItemRepository(db.sequelize);

export class OrderItemService {
  private orderItemRepository: OrderItemRepository;

  constructor(orderItemRepository: OrderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }
  async createOrderItem(orderItemData: Orderitem): Promise<Orderitem> {
    await orderService.getOrderById(orderItemData.orderId);
    await productService.getProductById(orderItemData.productId);
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
    try {
      await this.getOrderItemById(id);
      const item = orderItemRepository.updateOrderItem(id, orderItemData);

      return item;
    } catch (error) {
      throw error;
    }
  }

  async deleteOrderItem(id: string): Promise<void> {
    return orderItemRepository.deleteOrderItem(id);
  }
}

export const orderItemService = new OrderItemService(orderItemRepository);
