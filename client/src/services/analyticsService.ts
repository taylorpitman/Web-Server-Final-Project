/* B"H */
import { api } from './authService'
import type { DataListEnvelope } from './dataEnvelope'

export interface Analytics {
  id: number
  user_id: number
  total_minutes: number
  session_count: number
  average_mood: string
  streak_count: number
  date: string
}

export function get(id: number): Promise<Analytics> {
  return api(`analytics/${id}`)
}

export function getAllByUser(userId: number): Promise<DataListEnvelope<Analytics>> {
  return api(`users/${userId}/analytics`)
}

export function create(data: Omit<Analytics, 'id' | 'date'>): Promise<Analytics> {
  return api('analytics/create', data, 'POST')
}

export function update(data: Analytics): Promise<Analytics> {
  return api(`analytics/${data.id}`, data, 'PUT')
}

export function incrementStreak(id: number, date: string): Promise<Analytics> {
  return api(`analytics/${id}/increment-streak`, { date }, 'PATCH')
}

export function getStreak(id: number): Promise<Analytics> {
  return api(`analytics/${id}/streak`)
}

export function resetStreak(id: number, date: string): Promise<Analytics> {
  return api(`analytics/${id}/reset-streak`, { date }, 'PATCH')
}
