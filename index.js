const express = require("express");
const cors = require("cors");
require("dotenv").config(); 
const { connectDB } = require("./data/config");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/catalogo", require("./routes/catalogRoutes"));
app.use("/api/compania", require("./routes/companyRoutes"));
app.use("/api/chat", require("./routes/chatbotRoutes"));

// puerto compatible con Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
