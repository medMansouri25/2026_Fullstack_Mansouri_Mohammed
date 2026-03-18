require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 2004;

connectDB();

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});