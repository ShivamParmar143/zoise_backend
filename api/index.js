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

// Import routes
import contactroute from "../routes/contactroute.js";
import registerroute from "../routes/registerroute.js";
import loginroute from "../routes/loginroute.js";
import accountroute from "../routes/accountroute.js";

// Load environment variables
dotenv.config();

const app = express();

// ✅ Manually handle CORS for Vercel
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://zoise.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// ✅ Connect MongoDB
try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("✅ MongoDB connected"));
} catch (err) {
  console.error("❌ MongoDB connection error:", err.message);
}

// ✅ Health check/test route
app.get("/api/ping", (req, res) => {
  res.status(200).send("✅ Zoise backend is live!");
});

// ✅ Mount routes
app.use("/api", contactroute);
app.use("/api", registerroute);
app.use("/api", loginroute);
app.use("/api", accountroute);

// ✅ Export for Vercel serverless function
export default serverless(app);








