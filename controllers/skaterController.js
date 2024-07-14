const {
  getSkaters,
  addSkater,
  updateSkaterStatus,
  deleteSkater,
  getSkaterByEmail,
  updateSkater,
  getSkaterById,
} = require("../db/queries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllSkaters = async (req, res) => {
  try {
    const skaters = await getSkaters();
    console.log("Fetched skaters: ", skaters);
    res.render("index", { skaters });
  } catch (error) {
    console.error("Error fetching skaters:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAdminPage = async (req, res) => {
  try {
    const skaters = await getSkaters();
    res.render("admin", { skaters });
  } catch (error) {
    console.error("Error fetching skaters:", error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const skater = await getSkaterByEmail(email);
    if (!skater) {
      return res.status(401).send("Invalid credentials");
    }
    const match = await bcrypt.compare(password, skater.password);
    if (!match) {
      return res.status(401).send("Invalid credentials");
    }
    const token = jwt.sign(
      { id: skater.id, email: skater.email },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  const { email, nombre, password, anos_experiencia, especialidad } = req.body;
  const foto = req.files.foto;
  const fotoPath = `/images/${foto.name}`;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSkater = await addSkater(
      email,
      nombre,
      hashedPassword,
      anos_experiencia,
      especialidad,
      fotoPath
    );
    foto.mv(`./public/images/${foto.name}`, (err) => {
      if (err) {
        console.error("Error uploading photo:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).json(newSkater);
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const skater = await getSkaterById(id);
    res.json(skater);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.user;
  const { nombre, password, anos_experiencia, especialidad } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedSkater = await updateSkater(
      id,
      nombre,
      hashedPassword,
      anos_experiencia,
      especialidad
    );
    res.json(updatedSkater);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteProfile = async (req, res) => {
  const { id } = req.user;
  try {
    await deleteSkater(id);
    res.status(204).json({ redirectUrl: "/" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const updatedSkater = await updateSkaterStatus(id, estado);
    res.json(updatedSkater);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllSkaters,
  getAdminPage,
  login,
  register,
  getProfile,
  updateProfile,
  deleteProfile,
  updateStatus,
};
