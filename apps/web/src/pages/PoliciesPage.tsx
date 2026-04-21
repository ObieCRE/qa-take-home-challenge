import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { formatCurrency } from "../utils/format";

export function PoliciesPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [lobFilter, setLobFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (statusFilter) params.status = statusFilter;
    if (lobFilter) params.lineOfBusiness = lobFilter;
    if (sortBy) {
      params.sortBy = sortBy;
      params.sortOrder = sortOrder;
    }

    api.getPolicies(params).then((data) => {
      setPolicies(data.policies);
      setTotal(data.total);
      setLoading(false);
    });
  }, [search, statusFilter, lobFilter, sortBy, sortOrder]);

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
        <h1>Policies</h1>
        <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }} data-testid="policy-count">
          {total} {total === 1 ? "policy" : "policies"}
        </span>
      </div>

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search policies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="policy-search"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          data-testid="status-filter"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Expired">Expired</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select
          value={lobFilter}
          onChange={(e) => setLobFilter(e.target.value)}
          data-testid="lob-filter"
        >
          <option value="">All Lines of Business</option>
          <option value="General Liability">General Liability</option>
          <option value="Workers Comp">Workers Comp</option>
          <option value="Commercial Auto">Commercial Auto</option>
          <option value="Property">Property</option>
          <option value="Professional Liability">Professional Liability</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading policies...</div>
      ) : policies.length === 0 ? (
        <div className="empty-state" data-testid="empty-state">No policies found matching your criteria.</div>
      ) : (
        <div className="card">
          <div className="table-container">
            <table data-testid="policies-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("policyNumber")}>Policy #{sortIndicator("policyNumber")}</th>
                  <th onClick={() => handleSort("insuredName")}>Insured{sortIndicator("insuredName")}</th>
                  <th onClick={() => handleSort("lineOfBusiness")}>Line of Business{sortIndicator("lineOfBusiness")}</th>
                  <th onClick={() => handleSort("carrier")}>Carrier{sortIndicator("carrier")}</th>
                  <th onClick={() => handleSort("premium")}>Premium{sortIndicator("premium")}</th>
                  <th onClick={() => handleSort("status")}>Status{sortIndicator("status")}</th>
                  <th onClick={() => handleSort("effectiveDate")}>Effective{sortIndicator("effectiveDate")}</th>
                  <th onClick={() => handleSort("expirationDate")}>Expiration{sortIndicator("expirationDate")}</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((policy) => (
                  <tr key={policy.id} data-testid={`policy-row-${policy.id}`}>
                    <td>
                      <Link to={`/policies/${policy.id}`}>{policy.policyNumber}</Link>
                    </td>
                    <td>{policy.insuredName}</td>
                    <td>{policy.lineOfBusiness}</td>
                    <td>{policy.carrier}</td>
                    <td className="money">{formatCurrency(policy.premium)}</td>
                    <td>
                      <span className={`badge badge-${policy.status.toLowerCase()}`}>{policy.status}</span>
                    </td>
                    <td>{policy.effectiveDate}</td>
                    <td>{policy.expirationDate}</td>
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
