import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { routerAccount } = require('./routes/accounts');

const MONGO_URI_CLOUD = "mongodb+srv://ashuarena:arenaashu@cluster0.teyrnb7.mongodb.net/school-management?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI_CLOUD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected:", mongoose.connection.name);
})
.catch(err => {
  console.error("❌ Connection error:", err);
});

  app.use(
    cors({
      origin: function (origin, callback) {
        callback(null, origin || true); // Allow all origins dynamically
      },
      credentials: true,
    }),
  );
  

const port = 3001;

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log(mongoose.connection.name); 

app.use("/api/account", routerAccount);

app.listen(3001, () => {
  console.log("Listening on 3001");
});
