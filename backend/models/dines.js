const pool = require("../db/pool");

const dines = {
  findDines: async () => {
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query("SELECT * FROM `dines`");
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  findDineById: async (id) => {
    const selectQuery = "SELECT * FROM dines WHERE id=?;";

    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [id]);
      connection.release();
      return results[0];
    } catch (error) {
      throw new Error(error);
    }
  },
  createNewDine: async (dine) => {
    const insertQuery = "INSERT INTO `dines` SET ?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(insertQuery, [dine]);
      connection.release();

      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateDineById: async (dine) => {
    const updateQuery =
      "UPDATE `dines` SET `name` = ?, `price` = ?, `description` = ?  WHERE `id` = ?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(updateQuery, [
        dine.name,
        dine.price,
        dine.description,
        dine.id,
      ]);
      connection.release();

      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteDineById: async (id) => {
    const deleteQuery = "DELETE FROM `dines` WHERE `id` = ?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(deleteQuery, [id]);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },

  findByDine: async (dine) => {
    const findQuery = "SELECT * FROM `dines` WHERE name=?";
    try {
      const connection = await pool.getConnection();
      const [results] = await connection.query(findQuery, [dine.name]);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },
};
module.exports = dines;
