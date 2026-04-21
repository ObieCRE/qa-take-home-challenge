import { Router } from "express";
import { policies, claims } from "../data.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, (_req, res) => {
  const activePolicies = policies.filter((p) => p.status === "Active").length;
  const totalPremium = policies.filter((p) => p.status === "Active").reduce((sum, p) => sum + p.premium, 0);
  const openClaims = claims.filter((c) => c.status === "Open" || c.status === "Under Review").length;
  const totalReserves = claims
    .filter((c) => c.status !== "Closed" && c.status !== "Denied")
    .reduce((sum, c) => sum + c.reserveAmount, 0);
  const totalPaid = claims.reduce((sum, c) => sum + c.paidAmount, 0);

  const claimsByStatus = claims.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const policiesByLob = policies.reduce(
    (acc, p) => {
      acc[p.lineOfBusiness] = (acc[p.lineOfBusiness] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  res.json({
    activePolicies,
    totalPremium,
    openClaims,
    totalReserves,
    totalPaid,
    claimsByStatus,
    policiesByLob,
  });
});

export const dashboardRoutes = router;
