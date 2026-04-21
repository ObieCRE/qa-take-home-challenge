import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { formatCurrency } from "../utils/format";

export function ClaimsPage() {
  const [claims, setClaims] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    if (sortBy) {
      params.sortBy = sortBy;
      params.sortOrder = sortOrder;
    }

    api.getClaims(params).then((data) => {
      setClaims(data.claims);
      setTotal(data.total);
      setLoading(false);
    });
  }, [search, statusFilter, sortBy, sortOrder]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortIndicator = (column: string) => {
    if (sortBy !== column) return "";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  return (
    <div>
      <div className="page-header">
        <h1>Claims</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }} data-testid="claims-count">
            {total} {total === 1 ? "claim" : "claims"}
          </span>
          <Link to="/claims/new" className="btn btn-primary">
            File New Claim
          </Link>
        </div>
      </div>

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search claims..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="claims-search"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          data-testid="claims-status-filter"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading claims...</div>
      ) : claims.length === 0 ? (
        <div className="empty-state" data-testid="empty-state">No claims found matching your criteria.</div>
      ) : (
        <div className="card">
          <div className="table-container">
            <table data-testid="claims-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("claimNumber")}>Claim #{sortIndicator("claimNumber")}</th>
                  <th onClick={() => handleSort("policyNumber")}>Policy #{sortIndicator("policyNumber")}</th>
                  <th onClick={() => handleSort("claimantName")}>Claimant{sortIndicator("claimantName")}</th>
                  <th onClick={() => handleSort("lossType")}>Loss Type{sortIndicator("lossType")}</th>
                  <th onClick={() => handleSort("lossDate")}>Loss Date{sortIndicator("lossDate")}</th>
                  <th onClick={() => handleSort("reserveAmount")}>Reserve{sortIndicator("reserveAmount")}</th>
                  <th onClick={() => handleSort("paidAmount")}>Paid{sortIndicator("paidAmount")}</th>
                  <th onClick={() => handleSort("status")}>Status{sortIndicator("status")}</th>
                  <th onClick={() => handleSort("adjusterName")}>Adjuster{sortIndicator("adjusterName")}</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id} data-testid={`claim-row-${claim.id}`}>
                    <td>{claim.claimNumber}</td>
                    <td>{claim.policyNumber}</td>
                    <td>{claim.claimantName}</td>
                    <td>{claim.lossType}</td>
                    <td>{claim.lossDate}</td>
                    <td className="money">{formatCurrency(claim.reserveAmount)}</td>
                    <td className="money">{formatCurrency(claim.paidAmount)}</td>
                    <td>
                      <span className={`badge badge-${claim.status.toLowerCase().replace(/\s+/g, "-")}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td>{claim.adjusterName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
