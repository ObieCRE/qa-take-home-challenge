export interface Policy {
  id: string;
  policyNumber: string;
  insuredName: string;
  lineOfBusiness: "General Liability" | "Workers Comp" | "Commercial Auto" | "Property" | "Professional Liability";
  carrier: string;
  premium: number;
  status: "Active" | "Pending" | "Expired" | "Cancelled";
  effectiveDate: string;
  expirationDate: string;
  agencyCode: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  policyNumber: string;
  claimantName: string;
  lossType: string;
  lossDate: string;
  dateFiled: string;
  reserveAmount: number;
  paidAmount: number;
  status: "Open" | "Under Review" | "Approved" | "Denied" | "Closed";
  adjusterName: string;
  description: string;
}

export const policies: Policy[] = [
  {
    id: "pol-001",
    policyNumber: "GL-2024-001847",
    insuredName: "Riverside Construction LLC",
    lineOfBusiness: "General Liability",
    carrier: "Hartford Financial",
    premium: 12500,
    status: "Active",
    effectiveDate: "2024-01-15",
    expirationDate: "2025-01-15",
    agencyCode: "AGN-4421",
  },
  {
    id: "pol-002",
    policyNumber: "WC-2024-003291",
    insuredName: "Riverside Construction LLC",
    lineOfBusiness: "Workers Comp",
    carrier: "Employers Insurance",
    premium: 34200,
    status: "Active",
    effectiveDate: "2024-03-01",
    expirationDate: "2025-03-01",
    agencyCode: "AGN-4421",
  },
  {
    id: "pol-003",
    policyNumber: "CA-2024-000512",
    insuredName: "Metro Delivery Services",
    lineOfBusiness: "Commercial Auto",
    carrier: "Progressive Commercial",
    premium: 8750,
    status: "Active",
    effectiveDate: "2024-06-01",
    expirationDate: "2025-06-01",
    agencyCode: "AGN-7803",
  },
  {
    id: "pol-004",
    policyNumber: "PR-2023-002100",
    insuredName: "Oakwood Office Park",
    lineOfBusiness: "Property",
    carrier: "Chubb Limited",
    premium: 45000,
    status: "Expired",
    effectiveDate: "2023-04-01",
    expirationDate: "2024-04-01",
    agencyCode: "AGN-1150",
  },
  {
    id: "pol-005",
    policyNumber: "PL-2024-001003",
    insuredName: "Summit Accounting Group",
    lineOfBusiness: "Professional Liability",
    carrier: "Hiscox",
    premium: 6200,
    status: "Active",
    effectiveDate: "2024-07-15",
    expirationDate: "2025-07-15",
    agencyCode: "AGN-7803",
  },
  {
    id: "pol-006",
    policyNumber: "GL-2024-002934",
    insuredName: "Fresh Bites Catering Co",
    lineOfBusiness: "General Liability",
    carrier: "Hartford Financial",
    premium: 4800,
    status: "Pending",
    effectiveDate: "2024-11-01",
    expirationDate: "2025-11-01",
    agencyCode: "AGN-4421",
  },
  {
    id: "pol-007",
    policyNumber: "CA-2024-001200",
    insuredName: "Greenfield Landscaping",
    lineOfBusiness: "Commercial Auto",
    carrier: "Progressive Commercial",
    premium: 5400,
    status: "Cancelled",
    effectiveDate: "2024-02-15",
    expirationDate: "2025-02-15",
    agencyCode: "AGN-1150",
  },
  {
    id: "pol-008",
    policyNumber: "WC-2024-004010",
    insuredName: "Apex Manufacturing Inc",
    lineOfBusiness: "Workers Comp",
    carrier: "Employers Insurance",
    premium: 67800,
    status: "Active",
    effectiveDate: "2024-01-01",
    expirationDate: "2025-01-01",
    agencyCode: "AGN-9002",
  },
  {
    id: "pol-009",
    policyNumber: "PR-2024-003300",
    insuredName: "Harbor View Restaurant",
    lineOfBusiness: "Property",
    carrier: "Chubb Limited",
    premium: 15600,
    status: "Active",
    effectiveDate: "2024-05-01",
    expirationDate: "2025-05-01",
    agencyCode: "AGN-9002",
  },
  {
    id: "pol-010",
    policyNumber: "GL-2023-001500",
    insuredName: "Downtown Dental Associates",
    lineOfBusiness: "General Liability",
    carrier: "Travelers",
    premium: 3200,
    status: "Expired",
    effectiveDate: "2023-08-01",
    expirationDate: "2024-08-01",
    agencyCode: "AGN-7803",
  },
];

export const claims: Claim[] = [
  {
    id: "clm-001",
    claimNumber: "CLM-2024-00341",
    policyId: "pol-001",
    policyNumber: "GL-2024-001847",
    claimantName: "James Rodriguez",
    lossType: "Bodily Injury",
    lossDate: "2024-06-12",
    dateFiled: "2024-06-15",
    reserveAmount: 25000,
    paidAmount: 0,
    status: "Under Review",
    adjusterName: "Karen Mitchell",
    description: "Third party slip and fall at construction site. Claimant alleges wet concrete was not properly marked.",
  },
  {
    id: "clm-002",
    claimNumber: "CLM-2024-00298",
    policyId: "pol-002",
    policyNumber: "WC-2024-003291",
    claimantName: "Michael Torres",
    lossType: "On-the-Job Injury",
    lossDate: "2024-05-20",
    dateFiled: "2024-05-21",
    reserveAmount: 18000,
    paidAmount: 7500,
    status: "Open",
    adjusterName: "David Chen",
    description: "Employee fell from scaffolding at job site. Fracture to left wrist reported.",
  },
  {
    id: "clm-003",
    claimNumber: "CLM-2024-00415",
    policyId: "pol-003",
    policyNumber: "CA-2024-000512",
    claimantName: "Lisa Park",
    lossType: "Collision",
    lossDate: "2024-08-03",
    dateFiled: "2024-08-04",
    reserveAmount: 12000,
    paidAmount: 12000,
    status: "Closed",
    adjusterName: "Karen Mitchell",
    description: "Delivery vehicle rear-ended at intersection. Vehicle damage and minor injuries to third party.",
  },
  {
    id: "clm-004",
    claimNumber: "CLM-2024-00522",
    policyId: "pol-009",
    policyNumber: "PR-2024-003300",
    claimantName: "Harbor View Restaurant",
    lossType: "Fire Damage",
    lossDate: "2024-09-10",
    dateFiled: "2024-09-11",
    reserveAmount: 85000,
    paidAmount: 0,
    status: "Under Review",
    adjusterName: "Sarah Williams",
    description: "Kitchen fire caused significant damage to restaurant interior. Sprinkler system activated but damage to equipment and fixtures.",
  },
  {
    id: "clm-005",
    claimNumber: "CLM-2024-00189",
    policyId: "pol-008",
    policyNumber: "WC-2024-004010",
    claimantName: "Robert Kim",
    lossType: "Repetitive Strain",
    lossDate: "2024-03-15",
    dateFiled: "2024-04-02",
    reserveAmount: 9500,
    paidAmount: 9500,
    status: "Closed",
    adjusterName: "David Chen",
    description: "Employee reported chronic back pain from repetitive lifting. Medical treatment and physical therapy covered.",
  },
  {
    id: "clm-006",
    claimNumber: "CLM-2024-00601",
    policyId: "pol-001",
    policyNumber: "GL-2024-001847",
    claimantName: "Angela Murphy",
    lossType: "Property Damage",
    lossDate: "2024-10-01",
    dateFiled: "2024-10-03",
    reserveAmount: 15000,
    paidAmount: 0,
    status: "Open",
    adjusterName: "Sarah Williams",
    description: "Damage to neighboring property during excavation work. Foundation cracks reported by adjacent building owner.",
  },
  {
    id: "clm-007",
    claimNumber: "CLM-2024-00650",
    policyId: "pol-005",
    policyNumber: "PL-2024-001003",
    claimantName: "Northgate Holdings LLC",
    lossType: "Professional Error",
    lossDate: "2024-10-15",
    dateFiled: "2024-10-20",
    reserveAmount: 50000,
    paidAmount: 0,
    status: "Denied",
    adjusterName: "Karen Mitchell",
    description: "Client alleges accounting errors led to significant tax penalties. Claim denied due to late notification and pre-existing knowledge.",
  },
];
