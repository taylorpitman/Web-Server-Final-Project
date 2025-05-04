import { ref } from 'vue'
import * as myFetch from './myFetch'
import { get, type User } from './usersService'

const session = ref({
  user: null as User | null,
  token: null as string | null,
})

export function refSession() { return session }

export function api<T>(
    action: string, 
    data?: unknown,
    method?: string, 
    headers?: HeadersInit) 
    {
        return myFetch.api<T>(action, data, method, {
        Authorization: session.value.token ? `Bearer ${session.value.token}` : '',
        ...headers,
    })
}

export const isLoggedIn = () => !!session.value.user
export const isAdmin = () => session.value.user?.role === 'admin'

export function login(id: number) {
  return get(id).then((user) => { session.value.user = user })
}

export function logout() {
  session.value.user = null
  session.value.token = null
}
