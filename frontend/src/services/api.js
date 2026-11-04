const API_BASE = '/api/v1'

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

function getCookie(name) {
  const prefix = `${name}=`
  const cookie = document.cookie.split('; ').find((value) => value.startsWith(prefix))

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null
}

async function ensureCsrfCookie() {
  const response = await fetch('/sanctum/csrf-cookie', { credentials: 'include' })
  if (!response.ok) {
    throw new ApiError('Unable to start a secure session. Please try again.', response.status)
  }
}

export async function apiRequest(path, { method = 'GET', body, ...options } = {}) {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')

  if (body !== undefined) {
    headers.set('Content-Type', 'application/json')
  }

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
    await ensureCsrfCookie()
    const csrfToken = getCookie('XSRF-TOKEN')
    if (csrfToken) headers.set('X-XSRF-TOKEN', csrfToken)
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    method,
    headers,
    credentials: 'include',
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const contentType = response.headers.get('content-type') || ''
  let payload = {}

  if (contentType.includes('application/json')) {
    try {
      payload = await response.json()
    } catch {
      throw new ApiError('The server returned an invalid response.', response.status)
    }
  } else if (response.ok) {
    throw new ApiError('The server returned an unexpected response.', response.status)
  }

  if (!response.ok) {
    throw new ApiError(
      payload.message || 'The request could not be completed.',
      response.status,
      payload.errors || {},
    )
  }

  return payload
}
