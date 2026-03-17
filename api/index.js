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

// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// import contactroute from "../routes/contactroute.js";
// import registerroute from "../routes/registerroute.js";
// import loginroute from "../routes/loginroute.js";
// import accountroute from "../routes/accountroute.js";

// dotenv.config();
// const app = express();

// // CORS setup
// app.use(cors({
//   origin: ["http://localhost:3000", "https://zoise.vercel.app"],
//   credentials: true
// }));

// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch(err => console.error("❌ MongoDB error:", err));

// // Routes
// app.get("/api/ping", (req, res) => res.send("✅ Zoise backend is live!"));
// app.use("/api", contactroute);
// app.use("/api", registerroute);
// app.use("/api", loginroute);
// app.use("/api", accountroute);

// // Start Server
// const PORT = process.env.PORT || 3035;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import contactroute from "../routes/contactroute.js";
import registerroute from "../routes/registerroute.js";
import loginroute from "../routes/loginroute.js";
import accountroute from "../routes/accountroute.js";

dotenv.config();
const app = express();

// ✅ CORS Setup (handles local + production safely)
const allowedOrigins = [
  "http://localhost:3000",
  "https://zoise.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  },
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB Connection (prevent multiple connections on Vercel)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  }
};

// Connect DB on every request (safe for serverless)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ✅ Routes
app.get("/api/ping", (req, res) => {
  res.send("✅ Zoise backend is live!");
});

app.use("/api", contactroute);
app.use("/api", registerroute);
app.use("/api", loginroute);
app.use("/api", accountroute);

// ✅ Local Server (ONLY runs locally)
const PORT = process.env.PORT || 3035;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

// ✅ Export for Vercel
export default app;













