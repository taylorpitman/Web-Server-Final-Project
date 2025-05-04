

import type { DataListEnvelope } from './dataEnvelope'
import { api } from './authService'

export interface User {
  id: number
  username: string,
  email: string,
  study_goal: number,
  is_online: boolean,
  role?: 'admin' | 'user'
  created_at?: string
  avatar: string
  name: string
  streak: number
}
export type NewUser = Omit<User, 'id' | 'created_at'>


/******BASIC CRUD******/

export function create(user: NewUser): Promise<User> {
  return api('users', user, 'POST')
}

export function getAll(): Promise<DataListEnvelope<User>> {
  return api('users')
}

export function get(id: number): Promise<User> {
  return api(`users/${id}`)
}

export function update(user: User): Promise<User> {
  return api(`users/${user.id}`, user, 'PUT')
}

export function deleteUser(id: number): Promise<void> {
return api(`users/${id}`, {}, 'DELETE')
}
/***********************/



/******FRIEND FUNCTIONS******/

export function getFriends(id: number): Promise<DataListEnvelope<User>> {
  return api(`users/${id}/friends`)
}

export function getOnlineFriends(id: number): Promise<DataListEnvelope<User>> {
  return api(`users/${id}/friends/online`)
}

export function getFriendRequests(id: number): Promise<DataListEnvelope<User>> {
  return api(`users/${id}/friends/requests`)
}

export function addFriend(id: number): Promise<void> {
  return api(`users/${id}/friends`, {}, 'POST')
}

export function acceptFriendRequest(id: number): Promise<void> {
  return api(`users/${id}/friends/requests`, {}, 'POST')
}
export function removeFriend(id: number): Promise<void> {
  return api(`users/${id}/friends`, {}, 'DELETE')
}

export function declineFriendRequest(id: number): Promise<void> {
  return api(`users/${id}/friends/requests`, {}, 'DELETE')
}

/***********************/


export function getPosts(id: number): Promise<DataListEnvelope<User>> {
  return api(`users/${id}/posts`)
}


export function searchUser(
  search: string,
  page: number,
  limit: number,
): Promise<DataListEnvelope<User>> {
  return api(`users/search/${search}?page=${page}&limit=${limit}`)
}