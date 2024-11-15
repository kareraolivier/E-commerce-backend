import { Address } from "../../../models/address";
import { Sequelize, QueryTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { updateRecord } from "../../helpers/update.query";

export class AddressRepository {
  private sequelize: Sequelize;

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize;
  }

  async fetchAllAddresses(): Promise<Address[]> {
    const addresses = await this.sequelize.query(
      'SELECT * FROM "Addresses" ORDER BY id desc',
      {
        type: QueryTypes.SELECT,
      }
    );
    return addresses as Address[];
  }

  async fetchAddressById(id: string): Promise<Address | null> {
    const address = await this.sequelize.query(
      'SELECT * FROM "Addresses" WHERE "id" = :id',
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    return (address[0] as Address) || null;
  }

  async fetchAddressByUserId(id: string): Promise<Address | null> {
    const address = await this.sequelize.query(
      'SELECT * FROM "Addresses" WHERE "userId" = :userId',
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    return (address[0] as Address) || null;
  }

  async createAddress(address: Address): Promise<Address> {
    address.id = uuidv4();
    await this.sequelize.query(
      'INSERT INTO "Addresses" ("id", "country", "zipCode", "state", "city", "street", "userId", "createdAt", "updatedAt") VALUES (:id, :country, :zipCode, :state, :city, :street, :userId, :createdAt, :updatedAt) RETURNING *',
      {
        replacements: {
          id: address.id,
          country: address.country,
          zipCode: address.zipCode,
          state: address.state,
          city: address.city,
          street: address.street,
          userId: address.userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        type: QueryTypes.INSERT,
      }
    );
    return address;
  }

  async updateAddress(id: string, address: Partial<Address>): Promise<Address> {
    return (await updateRecord<Address>(
      this.sequelize,
      "Addresses",
      id,
      address
    )) as unknown as Address;
  }

  async deleteAddress(id: string): Promise<void> {
    await this.sequelize.query('DELETE FROM "Addresses" WHERE "id" = :id', {
      replacements: { id },
      type: QueryTypes.DELETE,
    });
  }
}
