/**
 * API client for the Mohammad Hossein (MH) × Jovaynee (JE) website.
 *
 * Posts form submissions to the backend (see /server).
 * If VITE_API_URL is not set, runs in DEMO mode — simulates a successful
 * submission so the site keeps working without a backend.
 *
 * Set the API URL in a root `.env` file:
 *   VITE_API_URL=https://mh-je-api.onrender.com
 */

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.trim() || "";

export type SubmissionSource = "MH" | "JE";

export type SubmissionPayload = {
  source: SubmissionSource;
  name: string;
  email: string;
  projectType?: string;
  videoType?: string;
  fileLink?: string;
  description: string;
};

export type SubmissionResult = {
  ok: boolean;
  demo: boolean;
  message: string;
  error?: string;
};

export function isApiConfigured(): boolean {
  return Boolean(API_URL);
}

export async function submitForm(
  payload: SubmissionPayload
): Promise<SubmissionResult> {
  // --- DEMO MODE: no backend configured ---
  if (!API_URL) {
    await new Promise((r) => setTimeout(r, 900));
    return {
      ok: true,
      demo: true,
      message:
        "Demo mode — no backend configured. Set VITE_API_URL in your .env to receive real submissions via Telegram.",
    };
  }

  // --- REAL MODE: POST to backend ---
  try {
    const res = await fetch(`${API_URL}/api/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const issues: { message: string }[] = Array.isArray(data.issues)
        ? data.issues
        : [];
      const issueText = issues.map((i) => i.message).join(" · ");
      return {
        ok: false,
        demo: false,
        message: data.message || data.error || "Submission failed.",
        error: issueText || data.error || `HTTP ${res.status}`,
      };
    }

    return {
      ok: true,
      demo: false,
      message: data.message || "Your request has been received.",
    };
  } catch (err) {
    return {
      ok: false,
      demo: false,
      message: "Network error. Please try again or contact us directly.",
      error: (err as Error).message,
    };
  }
}

export type PortfolioItem = {
  id: string;
  title: string;
  tag: string;
  gradient: string;
  videoUrl?: string;
  createdAt?: string;
};

export async function fetchPortfolio(): Promise<PortfolioItem[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/api/portfolio`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

export async function addPortfolioItem(adminKey: string, payload: Partial<PortfolioItem>): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/portfolio`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, error: "Failed to add item. Check admin key." };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function deletePortfolioItem(adminKey: string, id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/portfolio/${id}`, {
      method: "DELETE",
      headers: { "X-Admin-Key": adminKey },
    });
    if (!res.ok) return { ok: false, error: "Failed to delete item. Check admin key." };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export type ProjectItem = {
  id: string;
  title: string;
  tag: string;
  link?: string;
  createdAt?: string;
};

export async function fetchProjects(): Promise<ProjectItem[]> {
  if (!API_URL) return [];
  try {
    const res = await fetch(`${API_URL}/api/projects`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch {
    return [];
  }
}

export async function addProjectItem(adminKey: string, payload: Partial<ProjectItem>): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false, error: "Failed to add item. Check admin key." };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

export async function deleteProjectItem(adminKey: string, id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: { "X-Admin-Key": adminKey },
    });
    if (!res.ok) return { ok: false, error: "Failed to delete item. Check admin key." };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Verifies an admin key by hitting a protected endpoint.
 */
export async function verifyAdminKey(adminKey: string): Promise<boolean> {
  if (!API_URL || !adminKey) return false;
  try {
    const res = await fetch(`${API_URL}/api/submissions?limit=1`, {
      headers: { "X-Admin-Key": adminKey },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Quick health check against the API.
 */
export async function checkApiHealth(): Promise<{
  ok: boolean;
  status?: string;
}> {
  if (!API_URL) return { ok: false, status: "not configured" };
  try {
    const res = await fetch(`${API_URL}/api/health`, { method: "GET" });
    const data = await res.json();
    return { ok: res.ok, status: data.status || "unknown" };
  } catch {
    return { ok: false, status: "unreachable" };
  }
}
