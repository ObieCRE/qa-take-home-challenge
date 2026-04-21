import { useState, useEffect } from "react";
import { api } from "../api";
import { formatCurrency } from "../utils/format";

interface DashboardData {
  activePolicies: number;
  totalPremium: number;
  openClaims: number;
  totalReserves: number;
  totalPaid: number;
  claimsByStatus: Record<string, number>;
  policiesByLob: Record<string, number>;
}

export function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboard().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading || !data) return <div className="loading">Loading dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card" data-testid="stat-active-policies">
          <div className="stat-label">Active Policies</div>
          <div className="stat-value">{data.activePolicies}</div>
        </div>
        <div className="stat-card" data-testid="stat-total-premium">
          <div className="stat-label">Total Written Premium</div>
          <div className="stat-value money">{formatCurrency(data.totalPremium)}</div>
        </div>
        <div className="stat-card" data-testid="stat-open-claims">
          <div className="stat-label">Open Claims</div>
          <div className="stat-value">{data.openClaims}</div>
        </div>
        <div className="stat-card" data-testid="stat-total-reserves">
          <div className="stat-label">Outstanding Reserves</div>
          <div className="stat-value money">{formatCurrency(data.totalReserves)}</div>
        </div>
        <div className="stat-card" data-testid="stat-total-paid">
          <div className="stat-label">Total Paid</div>
          <div className="stat-value money">{formatCurrency(data.totalPaid)}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div className="card">
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Claims by Status</h2>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.claimsByStatus).map(([status, count]) => (
                <tr key={status}>
                  <td>
                    <span className={`badge badge-${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>
                  </td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Policies by Line of Business</h2>
          <table>
            <thead>
              <tr>
                <th>Line of Business</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.policiesByLob).map(([lob, count]) => (
                <tr key={lob}>
                  <td>{lob}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
