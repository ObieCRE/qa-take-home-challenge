import { Router } from "express";
import { sessions } from "../middleware/auth.js";

const VALID_USERS = [
  { username: "adjuster@obieinsurance.com", password: "claims123", role: "adjuster", name: "Karen Mitchell" },
  { username: "underwriter@obieinsurance.com", password: "underwrite456", role: "underwriter", name: "David Chen" },
  { username: "admin@obieinsurance.com", password: "admin789", role: "admin", name: "Sarah Williams" },
];

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  const user = VALID_USERS.find((u) => u.username === username && u.password === password);

  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = `tok_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  sessions.set(token, { username: user.username, role: user.role, name: user.name });

  res.json({ token, user: { username: user.username, role: user.role, name: user.name } });
});

router.post("/logout", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (token) sessions.delete(token);
  res.json({ success: true });
});

export const authRoutes = router;
