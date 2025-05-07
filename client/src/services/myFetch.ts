
export const API_ROOT = (import.meta.env.VITE_API_ROOT as string) ?? '/api/'

/*If data exits, default to post
If no data, default to get
always uses 'content-type: 'application/json'
Automatically parses JSON and casts to type T */

export function rest<T>(
  url: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  return fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then(async (res) => {
    if (res.status === 204) return {} as T; // 👈 fix: don't parse empty response
    return await res.json();
  });
}


/*Appends the action to the base URL 
calls rest() with full URL */
export function api<T>(
  action: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  return rest<T>(`${API_ROOT}${action}`, data, method, headers)
}
