import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuthenticated } from "./api";
import { LoginPage } from "./pages/LoginPage";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { PoliciesPage } from "./pages/PoliciesPage";
import { PolicyDetailPage } from "./pages/PolicyDetailPage";
import { ClaimsPage } from "./pages/ClaimsPage";
import { FileClaimPage } from "./pages/FileClaimPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export function App() {
  const [authed, setAuthed] = useState(isAuthenticated());

  useEffect(() => {
    const check = () => setAuthed(isAuthenticated());
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={() => setAuthed(true)} />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout onLogout={() => setAuthed(false)}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/policies" element={<PoliciesPage />} />
                <Route path="/policies/:id" element={<PolicyDetailPage />} />
                <Route path="/claims" element={<ClaimsPage />} />
                <Route path="/claims/new" element={<FileClaimPage />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
