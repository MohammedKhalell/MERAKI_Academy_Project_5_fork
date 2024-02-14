const { pool } = require("../models/db");

const createNewReels = (req, res) => {
  const { video } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO reels (video,user_id)VALUES ($1,$2) RETURNING *`;
  const value = [video, user_id];
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "reel created successfully",
        result: result.rows[0]
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err
      });
    });
};
// CREATE TABLE reels (
//     id SERIAL PRIMARY KEY,
//     video VARCHAR NOT NULL,
//     user_id INTEGER,
//     created_at TIMESTAMP DEFAULT NOW(),
//     FOREIGN Key (user_id) REFERENCES users(id),
//     is_deleted SMALLINT DEFAULT 0
//   );
module.exports = {
  createNewReels
};
