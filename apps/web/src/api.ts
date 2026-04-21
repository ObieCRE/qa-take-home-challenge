const API_BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function setAuth(token: string, user: { username: string; role: string; name: string }) {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

export function getUser(): { username: string; role: string; name: string } | null {
  const raw = localStorage.getItem("auth_user");
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    clearAuth();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export const api = {
  login: (username: string, password: string) =>
    request<{ token: string; user: { username: string; role: string; name: string } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  logout: () => request("/auth/logout", { method: "POST" }),

  getDashboard: () =>
    request<{
      activePolicies: number;
      totalPremium: number;
      openClaims: number;
      totalReserves: number;
      totalPaid: number;
      claimsByStatus: Record<string, number>;
      policiesByLob: Record<string, number>;
    }>("/dashboard"),

  getPolicies: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<{ policies: any[]; total: number }>(`/policies${qs}`);
  },

  getPolicy: (id: string) => request<{ policy: any; claims: any[] }>(`/policies/${id}`),

  getClaims: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<{ claims: any[]; total: number }>(`/claims${qs}`);
  },

  getClaim: (id: string) => request<{ claim: any }>(`/claims/${id}`),

  fileClaim: (data: {
    policyNumber: string;
    claimantName: string;
    lossType: string;
    lossDate: string;
    description: string;
  }) =>
    request<{ claim: any }>("/claims", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
