import { Request, Response, NextFunction } from "express";
import { orderItemService } from "../../services/item/orderItem.service";

export const getAllOrderItems = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await orderItemService.getAllOrderItems();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await orderItemService.getOrderItemById(id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderData: any = req.body;
    const newOrder = await orderItemService.createOrderItem(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const orderData: any = req.body;
    const updatedOrder = await orderItemService.updateOrderItem(id, orderData);
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrderItem = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    await orderItemService.deleteOrderItem(id);
    res.status(200).json({ message: "Order item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
