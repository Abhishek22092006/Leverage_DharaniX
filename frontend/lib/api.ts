// Central API service layer — add all backend calls here

const BASE_URL = 'http://127.0.0.1:8000/api'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
  role?: 'user' | 'admin'
}

export interface UserRead {
  id: number
  email: string
  full_name: string
  role: 'user' | 'admin'
  created_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface TokenData {
  access_token: string
  token_type: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${path}`
  const init: RequestInit = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  }

  console.log('[API] Request:', options.method ?? 'GET', url, init.body ?? '')

  const res = await fetch(url, init)
  const json = await res.json()

  console.log('[API] Response:', res.status, json)

  if (!res.ok) {
    // Backend uses custom envelope: { success, message, error }
    // Pydantic validation errors go through validation_exception_handler → error is an array
    const err = json?.error
    const message =
      typeof err === 'string'
        ? err                                                   // e.g. "Email already registered"
        : Array.isArray(err)
        ? err.map((d: { msg: string }) => d.msg).join(', ')    // Pydantic validation array
        : json?.message ?? 'Something went wrong'
    throw new Error(message)
  }

  return json as T
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export async function registerUser(
  payload: RegisterRequest
): Promise<ApiResponse<UserRead>> {
  return apiFetch<ApiResponse<UserRead>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function loginUser(
  payload: LoginRequest
): Promise<ApiResponse<TokenData>> {
  return apiFetch<ApiResponse<TokenData>>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
