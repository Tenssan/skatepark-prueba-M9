require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { engine } = require("express-handlebars");
const path = require("path");
const skaterController = require("./controllers/skaterController");
const { authMiddleware } = require("./middlewares/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.get("/", skaterController.getAllSkaters);
app.get("/admin", skaterController.getAdminPage);

app.post("/api/login", skaterController.login);
app.post("/api/register", skaterController.register);
app.get("/api/profile", authMiddleware, skaterController.getProfile);
app.put("/api/profile", authMiddleware, skaterController.updateProfile);
app.delete("/api/profile", authMiddleware, skaterController.deleteProfile);
app.put("/api/skaters/:id/status", skaterController.updateStatus);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
