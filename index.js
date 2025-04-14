import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";  // Ensure this is the path module
import { fileURLToPath } from "url";
import contactroute from "./routes/contactroute.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB = process.env.MONGODB_URL
mongoose
  .connect(DB)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("mongo error", err));


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/', contactroute)



app.listen(3035, () => {
    console.log("server connected")
})