import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth.js";
import { policyRoutes } from "./routes/policies.js";
import { claimRoutes } from "./routes/claims.js";
import { dashboardRoutes } from "./routes/dashboard.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3100;
app.listen(PORT, () => {
  console.log(`◉ Obie API running on http://localhost:${PORT}`);
});
