import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";  // Ensure this is the path module
import { fileURLToPath } from "url";
import contactroute from "./routes/contactroute.js"
import registerroute from "./routes/registerroute.js"
import loginroute from "./routes/loginroute.js"
import accountroute from "./routes/accountroute.js"



dotenv.config();
const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://zoise.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
// app.use(cors())

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
app.use('/', registerroute)
app.use('/',loginroute)
app.use('/',accountroute)



app.listen(3035, () => {
    console.log("server connected")
})