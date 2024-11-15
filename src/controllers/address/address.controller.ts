import { Request, Response, NextFunction } from "express";
import { addressService } from "../../services/address/address.service";

export const getAllAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const addresses = await addressService.getAllAddresses();
    res.status(200).json(addresses);
  } catch (error) {
    next(error);
  }
};

export const getAddressById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const address = await addressService.getAddressById(id);
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

export const getAddressByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const address = await addressService.getAddressByUserId(id);
    res.status(200).json(address);
  } catch (error) {
    next(error);
  }
};

export const createAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const addressData: any = req.body;
    const newAddress = await addressService.createAddress(addressData);
    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const addressData: any = req.body;
    const updatedAddress = await addressService.updateAddress(id, addressData);
    res.status(200).json(updatedAddress);
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await addressService.deleteAddress(id);
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    next(error);
  }
};
