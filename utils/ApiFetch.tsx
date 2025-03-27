export function ApiFetch(url: string, options: RequestInit = {}) {
  const secret:string = process.env.secret!
  const BASE_URL = process.env.serverURL

  return fetch(`${BASE_URL}${url}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      secret: secret,
      ...(options.headers || {}), // Merge existing headers
    },
  });
}

