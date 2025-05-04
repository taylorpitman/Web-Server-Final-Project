
import { api } from './authService'
import type { DataListEnvelope } from './dataEnvelope'

export interface Subject {
  id: number
  user_id: number
  name: string
  created_at?: string
}

export function getAll(): Promise<DataListEnvelope<Subject>> {
  return api('subjects')
}

export function get(id: number): Promise<Subject> {
  return api(`subjects/${id}`)
}

export function create(subject: Omit<Subject, 'id' | 'created_at'>): Promise<Subject> {
  return api('subjects/create', subject, 'POST')
}

export function update(subject: Subject): Promise<Subject> {
  return api(`subjects/${subject.id}`, subject, 'PUT')
}

export function remove(id: number): Promise<void> {
  return api(`subjects/${id}`, {}, 'DELETE')
}
