import { Router } from "express";
import { policies, claims, type Claim } from "../data.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, (req, res) => {
  let result: Claim[] = [...claims];

  const { status, policyId, search, sortBy, sortOrder } = req.query;

  if (status && typeof status === "string") {
    result = result.filter((c) => c.status === status);
  }

  if (policyId && typeof policyId === "string") {
    result = result.filter((c) => c.policyId === policyId);
  }

  if (search && typeof search === "string") {
    const q = search.toLowerCase();
    result = result.filter(
      (c) =>
        c.claimNumber.toLowerCase().includes(q) ||
        c.claimantName.toLowerCase().includes(q) ||
        c.policyNumber.toLowerCase().includes(q)
    );
  }

  if (sortBy && typeof sortBy === "string") {
    const order = sortOrder === "desc" ? -1 : 1;
    result.sort((a, b) => {
      const aVal = a[sortBy as keyof Claim];
      const bVal = b[sortBy as keyof Claim];
      if (typeof aVal === "number" && typeof bVal === "number") return (aVal - bVal) * order;
      return String(aVal).localeCompare(String(bVal)) * order;
    });
  }

  res.json({
    claims: result,
    total: result.length,
  });
});

router.get("/:id", requireAuth, (req, res) => {
  const claim = claims.find((c) => c.id === req.params.id);
  if (!claim) {
    res.status(404).json({ error: "Claim not found" });
    return;
  }
  res.json({ claim });
});

router.post("/", requireAuth, (req, res) => {
  const { policyNumber, claimantName, lossType, lossDate, description } = req.body;

  const errors: Record<string, string> = {};

  if (!policyNumber) errors.policyNumber = "Policy number is required";
  if (!claimantName) errors.claimantName = "Claimant name is required";
  if (!lossType) errors.lossType = "Loss type is required";
  if (!lossDate) errors.lossDate = "Loss date is required";
  if (!description) errors.description = "Description is required";
  if (description && description.length < 20) errors.description = "Description must be at least 20 characters";

  if (policyNumber) {
    const policy = policies.find((p) => p.policyNumber === policyNumber);
    if (!policy) {
      errors.policyNumber = "Policy not found";
    } else if (policy.status !== "Active") {
      errors.policyNumber = "Claims can only be filed against active policies";
    } else if (lossDate && new Date(lossDate) < new Date(policy.effectiveDate)) {
      errors.lossDate = "Loss date cannot be before policy effective date";
    } else if (lossDate && new Date(lossDate) > new Date(policy.expirationDate)) {
      errors.lossDate = "Loss date cannot be after policy expiration date";
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const policy = policies.find((p) => p.policyNumber === policyNumber)!;
  const user = (req as any).user;

  const newClaim: Claim = {
    id: `clm-${String(claims.length + 1).padStart(3, "0")}`,
    claimNumber: `CLM-2024-${String(700 + claims.length).padStart(5, "0")}`,
    policyId: policy.id,
    policyNumber: policy.policyNumber,
    claimantName,
    lossType,
    lossDate,
    dateFiled: new Date().toISOString().split("T")[0],
    reserveAmount: 0,
    paidAmount: 0,
    status: "Open",
    adjusterName: user.name,
    description,
  };

  claims.push(newClaim);
  res.status(201).json({ claim: newClaim });
});

export const claimRoutes = router;
