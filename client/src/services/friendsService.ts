// src/services/friendsService.ts

import type { DataListEnvelope } from './dataEnvelope'
import { api } from './authService'

export interface Friend {
  id: number
  user_id: number
  friend_id: number
  name: string
  username: string
  is_online: boolean
  avatar: string
  status: 'pending' | 'accepted'
}

// Create a new friendship (probably used internally or for testing)
export function createFriend(friendData: Partial<Friend>): Promise<Friend> {
  return api('friends/create', friendData, 'POST')
}

// Get all friends (admin or debug use)
export function getAllFriends(): Promise<Friend[]> {
  return api('friends')
}

// Get a specific friend record by ID
export function getFriendById(id: number): Promise<Friend> {
  return api(`friends/${id}`)
}

// Update a friendship record
export function updateFriend(id: number, updates: Partial<Friend>): Promise<Friend> {
  return api(`friends/${id}`, updates, 'PUT')
}

// Delete a friendship record
export function deleteFriend(id: number): Promise<void> {
  return api(`friends/${id}`, {}, 'DELETE')
}


export function getFriendsByUser(userId: number): Promise<Friend[]> {
    return api(`users/${userId}/friends`)
  }
  
  export function getPendingFriendRequests(userId: number): Promise<Friend[]> {
    return api(`users/${userId}/friends/requests`)
  }
  
  export function acceptFriendRequest(friendId: number): Promise<Friend> {
    return api(`users/${friendId}/friends/requests`, {}, 'POST')
  }
  
  export function declineFriendRequest(friendId: number): Promise<void> {
    return api(`users/${friendId}/friends/requests`, {}, 'DELETE')
  }
  
  export function sendFriendRequest(friendId: number): Promise<Friend> {
    return api(`users/${friendId}/friends`, {}, 'POST')
  }

  
  