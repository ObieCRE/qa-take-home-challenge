import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import { formatCurrency } from "../utils/format";

export function PolicyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [policy, setPolicy] = useState<any>(null);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    api
      .getPolicy(id)
      .then((data) => {
        setPolicy(data.policy);
        setClaims(data.claims);
        setLoading(false);
      })
      .catch(() => {
        setError("Policy not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading policy...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!policy) return null;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/policies" style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            ← Back to Policies
          </Link>
          <div className="detail-header">
            <h1>{policy.policyNumber}</h1>
            <span className={`badge badge-${policy.status.toLowerCase()}`}>{policy.status}</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="detail-grid">
          <div className="detail-field">
            <div className="detail-label">Insured Name</div>
            <div className="detail-value" data-testid="insured-name">{policy.insuredName}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Line of Business</div>
            <div className="detail-value" data-testid="line-of-business">{policy.lineOfBusiness}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Carrier</div>
            <div className="detail-value" data-testid="carrier">{policy.carrier}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Premium</div>
            <div className="detail-value money" data-testid="premium">{formatCurrency(policy.premium)}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Effective Date</div>
            <div className="detail-value" data-testid="effective-date">{policy.effectiveDate}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Expiration Date</div>
            <div className="detail-value" data-testid="expiration-date">{policy.expirationDate}</div>
          </div>
          <div className="detail-field">
            <div className="detail-label">Agency Code</div>
            <div className="detail-value" data-testid="agency-code">{policy.agencyCode}</div>
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem" }}>
        Related Claims ({claims.length})
      </h2>

      {claims.length === 0 ? (
        <div className="empty-state">No claims filed against this policy.</div>
      ) : (
        <div className="card">
          <div className="table-container">
            <table data-testid="policy-claims-table">
              <thead>
                <tr>
                  <th>Claim #</th>
                  <th>Claimant</th>
                  <th>Loss Type</th>
                  <th>Loss Date</th>
                  <th>Reserve</th>
                  <th>Paid</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr key={claim.id}>
                    <td>{claim.claimNumber}</td>
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
