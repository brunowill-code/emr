import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/routes.js";

dotenv.config();
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Rotas
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
