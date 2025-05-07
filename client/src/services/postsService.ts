// services/postsService.ts
import { api } from './authService'
import type { DataListEnvelope } from './dataEnvelope'

export interface Post {
  id: number
  user_id: number
  subject_id: number
  content: string
  mood_id?: number
  is_public?: boolean
  created_at?: string
  likes?: number
  dislikes?: number
  users?: { name: string 
    username: string
  }
  subjects?: { name: string 
  }
}
export type NewPost = Omit<Post, 'id' | 'created_at'>

// Create a new post
export function create(post: Omit<Post, 'id' | 'created_at'>): Promise<Post> {
    return api('posts/create', post, 'POST')
  }
  

// Get all posts
export function getAll(): Promise<DataListEnvelope<Post>> {
  return api('posts')
}

// Get post by ID
export function get(id: number): Promise<Post> {
  return api(`posts/${id}`)
}

// Update a post
export function update(post: Post): Promise<Post> {
  return api(`posts/${post.id}`, post, 'PUT')
}

// Delete a post
export function remove(id: number): Promise<void> {
  return api(`posts/${id}`, {}, 'DELETE')
}

// Get posts by user
export function getByUser(userId: number): Promise<DataListEnvelope<Post>> {
  return api(`users/${userId}/posts`)
}

export function buildFeed(body: {user_id: number, limit: number, offset: number}): Promise<DataListEnvelope<Post>> {
  console.log("api result", api('users/feed', body)) 
  return api('users/feed', body);
}

export function updateLikes(postId: number, increment:number): Promise<Post> {
  return api(`posts/${postId}/like`, {increment}, 'PATCH')
}

export function getSubjectsByPost(postId: number): Promise<DataListEnvelope<Post>> {
  return api(`posts/${postId}/subjects`)
}