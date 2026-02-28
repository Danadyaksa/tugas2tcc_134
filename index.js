// Import Package dan File
const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

// Cara 1. Izinkan Semua Origin (tidak disarankan untuk produksi)
app.use(cors());

// Cara 2. Izinkan Frontend tertentu (misal Vite di localhost:5173)
// app.use(cors({
//   origin: 'http://localhost:5173', // Alamat Vite kamu
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true // Jika butuh kirim cookie/session
// }));

// Middleware untuk parsing JSON
app.use(express.json());

// Route dasar untuk testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Setting Routes
require("./schema/User"); // Untuk generate Tabel Users
app.use("/api/v1/users", userRoutes); // Untuk setting routes user

// Sync Database dan Jalankan Server
const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
