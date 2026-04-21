import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api";

const LOSS_TYPES = [
  "Bodily Injury",
  "Property Damage",
  "Collision",
  "Fire Damage",
  "Water Damage",
  "Theft",
  "On-the-Job Injury",
  "Repetitive Strain",
  "Professional Error",
  "Other",
];

export function FileClaimPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    policyNumber: "",
    claimantName: "",
    lossType: "",
    lossDate: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user types
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitError("");
    setLoading(true);

    try {
      const result = await api.fileClaim(formData);
      setSuccess(`Claim ${result.claim.claimNumber} has been filed successfully.`);
      // Reset form
      setFormData({ policyNumber: "", claimantName: "", lossType: "", lossDate: "", description: "" });
    } catch (err: any) {
      if (err?.errors) {
        setErrors(err.errors);
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/claims" style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
            ← Back to Claims
          </Link>
          <h1 style={{ marginTop: "0.5rem" }}>File a New Claim (FNOL)</h1>
        </div>
      </div>

      {success && (
        <div className="alert alert-success" data-testid="success-message">
          {success}{" "}
          <Link to="/claims" style={{ fontWeight: 600 }}>
            View all claims →
          </Link>
        </div>
      )}

      {submitError && (
        <div className="alert alert-error" data-testid="submit-error">
          {submitError}
        </div>
      )}

      <div className="card" style={{ maxWidth: "640px" }}>
        <form onSubmit={handleSubmit} data-testid="file-claim-form">
          <div className="form-group">
            <label htmlFor="policyNumber">Policy Number</label>
            <input
              id="policyNumber"
              type="text"
              value={formData.policyNumber}
              onChange={(e) => handleChange("policyNumber", e.target.value)}
              placeholder="e.g. GL-2024-001847"
              className={errors.policyNumber ? "has-error" : ""}
              data-testid="policy-number-input"
            />
            {errors.policyNumber && (
              <div className="field-error" data-testid="policy-number-error">
                {errors.policyNumber}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="claimantName">Claimant Name</label>
            <input
              id="claimantName"
              type="text"
              value={formData.claimantName}
              onChange={(e) => handleChange("claimantName", e.target.value)}
              placeholder="Full name of the claimant"
              className={errors.claimantName ? "has-error" : ""}
              data-testid="claimant-name-input"
            />
            {errors.claimantName && (
              <div className="field-error" data-testid="claimant-name-error">
                {errors.claimantName}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lossType">Loss Type</label>
            <select
              id="lossType"
              value={formData.lossType}
              onChange={(e) => handleChange("lossType", e.target.value)}
              className={errors.lossType ? "has-error" : ""}
              data-testid="loss-type-select"
            >
              <option value="">Select a loss type</option>
              {LOSS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.lossType && (
              <div className="field-error" data-testid="loss-type-error">
                {errors.lossType}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lossDate">Date of Loss</label>
            <input
              id="lossDate"
              type="date"
              value={formData.lossDate}
              onChange={(e) => handleChange("lossDate", e.target.value)}
              className={errors.lossDate ? "has-error" : ""}
              data-testid="loss-date-input"
            />
            {errors.lossDate && (
              <div className="field-error" data-testid="loss-date-error">
                {errors.lossDate}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description of Loss</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Provide a detailed description of the loss event (min 20 characters)"
              rows={4}
              className={errors.description ? "has-error" : ""}
              data-testid="description-input"
            />
            {errors.description && (
              <div className="field-error" data-testid="description-error">
                {errors.description}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            <button type="submit" className="btn btn-primary" disabled={loading} data-testid="submit-claim-button">
              {loading ? "Filing Claim..." : "File Claim"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/claims")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
