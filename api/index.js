// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import path from "path";  // Ensure this is the path module
// import { fileURLToPath } from "url";
// import contactroute from "./routes/contactroute.js"
// import registerroute from "./routes/registerroute.js"
// import loginroute from "./routes/loginroute.js"
// import accountroute from "./routes/accountroute.js"



// dotenv.config();
// const app = express();

// const allowedOrigins = ['https://zoise.vercel.app']; // Add any more as needed

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // if you're using cookies or sessions
// };

// app.use(cors(corsOptions));
// app.use(express.json());


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const DB = process.env.MONGODB_URL
// mongoose
//   .connect(DB)
//   .then(() => console.log("mongodb connected"))
//   .catch((err) => console.log("mongo error", err));


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.use('/', contactroute)
// app.use('/', registerroute)
// app.use('/',loginroute)
// app.use('/',accountroute)



// app.listen(3035, () => {
//     console.log("server connected")
// })

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import serverless from "serverless-http";
import path from "path";
import { fileURLToPath } from "url";

import contactroute from "../routes/contactroute.js";
import registerroute from "../routes/registerroute.js";
import loginroute from "../routes/loginroute.js";
import accountroute from "../routes/accountroute.js";

dotenv.config();

const app = express();

// ✅ Allow both frontend (production) and local dev
const allowedOrigins = ["https://zoise.vercel.app", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB Connection
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ Mongo error:", err));
}

// ✅ API Routes
app.use("/api", contactroute);
app.use("/api", registerroute);
app.use("/api", loginroute);
app.use("/api", accountroute);

app.get("/api", (req, res) => {
  res.send("✅ Zoise backend is running");
});

// ✅ Vercel Export
export default serverless(app);












