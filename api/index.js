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

// Import routes (adjust paths if needed)
import contactroute from "../routes/contactroute.js";
import registerroute from "../routes/registerroute.js";
import loginroute from "../routes/loginroute.js";
import accountroute from "../routes/accountroute.js";

// Setup env
dotenv.config();

const app = express();

// ✅ Manually set CORS headers for Vercel compatibility
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://zoise.vercel.app"); // your frontend
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// ✅ Connect MongoDB once
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!mongoose.connection.readyState) {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Mongo error:", err));
}

// ✅ Routes
app.use("/api", contactroute);
app.use("/api", registerroute);
app.use("/api", loginroute);
app.use("/api", accountroute);

app.get("/api", (req, res) => {
  res.send("Zoise backend is live!");
});

// ✅ Export for Vercel
export default serverless(app);






