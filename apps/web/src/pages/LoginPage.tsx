import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuth } from "../api";

export function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, user } = await api.login(username, password);
      setAuth(token, user);
      onLogin();
      navigate("/");
    } catch (err: any) {
      setError(err?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/obie-logo.webp" alt="Obie" className="login-logo" />
        <p className="subtitle">Sign in to your account</p>

        {error && (
          <div className="login-error" data-testid="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              id="username"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="you@obieinsurance.com"
              required
              data-testid="username-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              data-testid="password-input"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} data-testid="login-button">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
