
const pool = require('../db/pool');

const users = {
  create: async (user) => {
    try {

      const insertQuery = 'INSERT INTO `users` SET ?';
      const connection = await pool.getConnection();
      const [results] = await connection.query(insertQuery, [user]);
      //console.log('User inserted successfully:', results);
      connection.release();
      return results;
    } catch (error) {
      throw new Error(error);
    }
  },


  findByEmail: async (email) => {
    try {
      const selectQuery = 'SELECT * FROM `users` WHERE email=?';
      const connection = await pool.getConnection();
      const [results] = await connection.query(selectQuery, [email]);
      //console.log('User checked successfully:', results);
      return results;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = users