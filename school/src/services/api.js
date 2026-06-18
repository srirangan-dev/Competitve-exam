// ─────────────────────────────────────────────────────────────────────────────
// src/services/api.js
// Copy this file into your React frontend at: src/services/api.js
// Then update your store.js to use these functions.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = 'https://competitve-exam.onrender.com/api';

if (!BASE_URL) {
  console.error('❌ VITE_API_URL is not set! Check your .env file or Vercel env vars.');
}
// ── Helper: get stored JWT ────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('token');

// ── Helper: build fetch options ───────────────────────────────────────────────
const fetchOptions = (method, body = null, requiresAuth = true) => {
  const headers = { 'Content-Type': 'application/json' };
  if (requiresAuth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
};

// ── Helper: handle response ───────────────────────────────────────────────────
const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

// ══════════════════════════════════════════════════════════════════════════════
// AUTH API
// ══════════════════════════════════════════════════════════════════════════════

export const authAPI = {
  // POST /api/auth/signup
  signup: async ({ name, email, password, exam }) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, fetchOptions('POST', { name, email, password, exam }, false));
    const data = await handleResponse(res);
    if (data.token) localStorage.setItem('token', data.token);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  // POST /api/auth/login
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, fetchOptions('POST', { email, password }, false));
    const data = await handleResponse(res);
    if (data.token) localStorage.setItem('token', data.token);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  // GET /api/auth/me
  getMe: async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, fetchOptions('GET'));
    return handleResponse(res);
  },

  // PUT /api/auth/profile
  updateProfile: async (updates) => {
    const res = await fetch(`${BASE_URL}/auth/profile`, fetchOptions('PUT', updates));
    const data = await handleResponse(res);
    if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  },

  // POST /api/auth/forgot-password
  forgotPassword: async (email) => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, fetchOptions('POST', { email }, false));
    return handleResponse(res);
  },

  // POST /api/auth/reset-password
  resetPassword: async (email, otp, newPassword) => {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, fetchOptions('POST', { email, otp, newPassword }, false));
    return handleResponse(res);
  },

  // POST /api/auth/change-password
  changePassword: async (currentPassword, newPassword) => {
    const res = await fetch(`${BASE_URL}/auth/change-password`, fetchOptions('POST', { currentPassword, newPassword }));
    return handleResponse(res);
  },

  // Logout (local only — JWT is stateless)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// AI CHAT API
// ══════════════════════════════════════════════════════════════════════════════

export const aiAPI = {
  // POST /api/ai/chat — send message, get reply
  chat: async (message, sessionId = null, subject = 'General') => {
    const res = await fetch(
      `${BASE_URL}/ai/chat`,
      fetchOptions('POST', { message, sessionId, subject })
    );
    return handleResponse(res);
  },

  // POST /api/ai/chat/stream — streaming SSE
  // Returns an EventSource-like async generator
  chatStream: async function* (message, sessionId = null) {
    const res = await fetch(`${BASE_URL}/ai/chat/stream`, fetchOptions('POST', { message, sessionId }));

    if (!res.ok) throw new Error('Stream request failed');

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const lines = text.split('\n').filter((l) => l.startsWith('data: '));
      for (const line of lines) {
        try {
          const data = JSON.parse(line.replace('data: ', ''));
          yield data;
          if (data.done) return;
        } catch {
          // skip malformed chunks
        }
      }
    }
  },

  // GET /api/ai/sessions
  getSessions: async () => {
    const res = await fetch(`${BASE_URL}/ai/sessions`, fetchOptions('GET'));
    return handleResponse(res);
  },

  // GET /api/ai/sessions/:id
  getSession: async (id) => {
    const res = await fetch(`${BASE_URL}/ai/sessions/${id}`, fetchOptions('GET'));
    return handleResponse(res);
  },

  // DELETE /api/ai/sessions/:id
  deleteSession: async (id) => {
    const res = await fetch(`${BASE_URL}/ai/sessions/${id}`, fetchOptions('DELETE'));
    return handleResponse(res);
  },
};

// ══════════════════════════════════════════════════════════════════════════════
// EXAM NOTIFICATIONS API
// ══════════════════════════════════════════════════════════════════════════════

export const examAPI = {
  // GET /api/exams
  getAll: async (category = 'all', status = 'all') => {
    const params = new URLSearchParams({ category, status });
    const res = await fetch(`${BASE_URL}/exams?${params}`, fetchOptions('GET', null, false));
    return handleResponse(res);
  },

  // POST /api/exams/:id/notify-me — send email for a specific exam
  notifyMe: async (examId) => {
    const res = await fetch(`${BASE_URL}/exams/${examId}/notify-me`, fetchOptions('POST'));
    return handleResponse(res);
  },

  // POST /api/exams/notify-all — send all upcoming exam emails
  notifyAll: async () => {
    const res = await fetch(`${BASE_URL}/exams/notify-all`, fetchOptions('POST'));
    return handleResponse(res);
  },
};
