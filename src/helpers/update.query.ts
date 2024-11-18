import { Sequelize, QueryTypes, Transaction } from "sequelize";

/**
 * Helper function to dynamically update a record in any table.
 * @param sequelize - Sequelize instance
 * @param tableName - Name of the table
 * @param id - ID of the record to update
 * @param data - Object containing the fields to update
 * @returns Updated record or null if the update fails
 */
export async function updateRecord<T>(
  sequelize: Sequelize,
  tableName: string,
  id: string,
  data: Partial<T>
): Promise<Partial<T> | null> {
  // Filter out undefined fields
  const fieldsToUpdate = Object.entries(data)
    .filter(([_, value]) => value !== undefined)
    .map(([key]) => `"${key}" = :${key}`);

  if (fieldsToUpdate.length === 0) {
    throw new Error("No fields provided to update.");
  }

  // Construct the SET clause
  const setClause = fieldsToUpdate.join(", ");
  const query = `UPDATE "${tableName}" SET ${setClause}, "updatedAt" = :updatedAt WHERE "id" = :id RETURNING *`;

  // Execute the query with replacements
  const [result] = await sequelize.query(query, {
    replacements: {
      ...data,
      id,
      updatedAt: new Date(),
    },
    type: QueryTypes.UPDATE,
  });

  return result ? (result as Partial<T>) : null;
}
