import { NavLink, useNavigate } from "react-router-dom";
import { getUser, clearAuth, api } from "../api";

export function Layout({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    }
    clearAuth();
    onLogout();
    navigate("/login");
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand"><img src="/obie-logo.webp" alt="Obie" className="sidebar-logo" /></div>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/policies" className={({ isActive }) => (isActive ? "active" : "")}>
              Policies
            </NavLink>
          </li>
          <li>
            <NavLink to="/claims" className={({ isActive }) => (isActive ? "active" : "")}>
              Claims
            </NavLink>
          </li>
          <li>
            <NavLink to="/claims/new" className={({ isActive }) => (isActive ? "active" : "")}>
              File a Claim
            </NavLink>
          </li>
        </ul>
        {user && (
          <div className="sidebar-footer">
            <div className="user-name" data-testid="user-name">{user.name}</div>
            <div className="user-role" data-testid="user-role">{user.role}</div>
            <button onClick={handleLogout} data-testid="logout-button">Sign Out</button>
          </div>
        )}
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
