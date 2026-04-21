import type express from "express";

export interface AuthUser {
  username: string;
  role: string;
  name: string;
}

export const sessions = new Map<string, AuthUser>();

export function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token || !sessions.has(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  (req as any).user = sessions.get(token);
  next();
}
