export type IOrder = {
  id: string;
  date: string;
  userId: string;
  totalAmount: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IOrderItem = {
  orderId: string;
  productId: string;
  quantity: number;
  amount: string;
};

export type ICheckoutOrder = {
  date: string;
  userId: string;
  totalAmount: string;
  items: IOrderItem[];
  status: string;
};
