require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.HOST_DB,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD_DB,
  port: process.env.DB_PORT,
});

const addSkater = async (
  email,
  nombre,
  password,
  anos_experiencia,
  especialidad,
  foto
) => {
  const query = {
    text: "INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, false) RETURNING *",
    values: [email, nombre, password, anos_experiencia, especialidad, foto],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (e) {
    console.error("Error adding a new skater: ", e);
    throw e;
  }
};

const getSkaters = async () => {
  const query = {
    text: "SELECT * FROM skaters",
  };
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (e) {
    console.error("Error getting skaters: ", e);
    throw e;
  }
};

const getSkaterByEmail = async (email) => {
  const query = {
    text: "SELECT * FROM skaters WHERE email = $1",
    values: [email],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (e) {
    console.error("Error getting skater by email: ", e);
    throw e;
  }
};

const getSkaterById = async (id) => {
  const query = {
    text: "SELECT * FROM skaters WHERE id = $1",
    values: [id],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (e) {
    console.error("Error getting skater by id: ", e);
    throw e;
  }
};

const updateSkater = async (
  id,
  nombre,
  password,
  anos_experiencia,
  especialidad
) => {
  const query = {
    text: "UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 WHERE id = $5 RETURNING *",
    values: [nombre, password, anos_experiencia, especialidad, id],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (e) {
    console.error("Error updating skater: ", e);
    throw e;
  }
};

const deleteSkater = async (id) => {
  const query = {
    text: "DELETE FROM skaters WHERE id = $1 RETURNING *",
    values: [id],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (e) {
    console.error("Error deleting skater: ", e);
    throw e;
  }
};

const updateSkaterStatus = async (id, estado) => {
  const query = {
    text: "UPDATE skaters SET estado = $1 WHERE id = $2 RETURNING *",
    values: [estado, id],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (e) {
    console.error("Error updating skater status: ", e);
    throw e;
  }
};

module.exports = {
  addSkater,
  getSkaters,
  getSkaterByEmail,
  getSkaterById,
  updateSkater,
  deleteSkater,
  updateSkaterStatus,
};
