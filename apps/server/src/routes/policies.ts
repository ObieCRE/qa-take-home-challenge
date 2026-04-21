import { Router } from "express";
import { policies, claims, type Policy } from "../data.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, async (req, res) => {
  // Simulate real-world API latency
  await new Promise((r) => setTimeout(r, 200 + Math.random() * 600));

  let result: Policy[] = [...policies];

  const { status, lineOfBusiness, search, sortBy, sortOrder } = req.query;

  if (status && typeof status === "string") {
    result = result.filter((p) => p.status === status);
  }

  if (lineOfBusiness && typeof lineOfBusiness === "string") {
    result = result.filter((p) => p.lineOfBusiness === lineOfBusiness);
  }

  if (search && typeof search === "string") {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.policyNumber.toLowerCase().includes(q) ||
        p.insuredName.toLowerCase().includes(q) ||
        p.carrier.toLowerCase().includes(q)
    );
  }

  if (sortBy && typeof sortBy === "string") {
    const order = sortOrder === "desc" ? -1 : 1;
    result.sort((a, b) => {
      const aVal = a[sortBy as keyof Policy];
      const bVal = b[sortBy as keyof Policy];
      if (typeof aVal === "number" && typeof bVal === "number") return (aVal - bVal) * order;
      return String(aVal).localeCompare(String(bVal)) * order;
    });
  }

  res.json({
    policies: result,
    total: result.length,
  });
});

router.get("/:id", requireAuth, (req, res) => {
  const policy = policies.find((p) => p.id === req.params.id);
  if (!policy) {
    res.status(404).json({ error: "Policy not found" });
    return;
  }

  const policyClaims = claims.filter((c) => c.policyId === policy.id);
  res.json({ policy, claims: policyClaims });
});

export const policyRoutes = router;
