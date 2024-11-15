import db from "../../../models";
import { Address } from "../../../models/address";
import { NotFoundError } from "../../errors/AppErrors";
import { AddressRepository } from "../../repository/address/address.repository";
import { userService } from "../users/user.service";

const addressRepository = new AddressRepository(db.sequelize);

class AddressService {
  private addressRepository: AddressRepository;
  constructor(addressRepository: AddressRepository) {
    this.addressRepository = addressRepository;
  }

  async getAllAddresses(): Promise<Address[]> {
    return await addressRepository.fetchAllAddresses();
  }

  async getAddressById(id: string): Promise<Address | null> {
    const address = await addressRepository.fetchAddressById(id);
    if (!address) {
      throw new NotFoundError("Address not found");
    }
    return address;
  }

  async getAddressByUserId(userId: string): Promise<Address | null> {
    const address = await addressRepository.fetchAddressByUserId(userId);
    if (!address) {
      throw new NotFoundError("Address not found");
    }
    return address;
  }

  async createAddress(address: Address): Promise<Address> {
    await userService.getUserById(address.userId);
    return await addressRepository.createAddress(address);
  }

  async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
    await this.getAddressById(id);
    return await addressRepository.updateAddress(id, address);
  }

  async deleteAddress(id: string): Promise<void> {
    await this.getAddressById(id);
    return await addressRepository.deleteAddress(id);
  }
}

export const addressService = new AddressService(addressRepository);
