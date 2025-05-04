import { ref, onMounted } from 'vue'
import * as usersService from '@/services/usersService'
import * as analyticsService from '@/services/analyticsService.ts'
import * as subjectsService from '@/services/subjectsService'
import type { User } from '@/services/usersService'
import type { Subject } from '@/services/subjectsService'
import type { Analytics } from '@/services/analyticsService.ts'

const currentUser = ref<User | null>(null)
const friends = ref<User[]>([])
const friendRequests = ref<User[]>([])
const activities = ref<any[]>([]) // You'll likely define a proper Activity type later
const subjects = ref<Subject[]>([])
const analytics = ref<Analytics | null>(null)



export function useCurrentUser() {
  async function loadUser(userId: number) {
    currentUser.value = await usersService.get(userId)
  }


  async function loadAllUsers() {
    const users = await usersService.getAll()
    return users.items
  }

  async function loadFriends(userId: number) {
    friends.value = await usersService.getFriends(userId).then(r => r.items)
  }

  async function loadFriendRequests(userId: number) {
    friendRequests.value = await usersService.getFriendRequests(userId).then(r => r.items)
  }

  // async function loadSubjects(userId: number) {
  //   subjects.value = await subjectsService.get(userId).then(r => r.items)
  // }

  // async function loadAnalytics(userId: number) {
  //   analytics.value = await analyticsService.get(userId).then(r => r.items[0])
  // }

  function clearUser() {
    currentUser.value = null
    friends.value = []
    friendRequests.value = []
    subjects.value = []
    activities.value = []
    analytics.value = null
  }

  onMounted(() => {
    const id = sessionStorage.getItem('currentUserId')
    if (id) loadUser(Number(id))
  })

  const logout = () => {
    currentUser.value = null
    sessionStorage.removeItem('currentUserId')
  }
  

  return {
    currentUser,
    friends,
    friendRequests,
    activities,
    subjects,
    analytics,
    loadUser,
    loadAllUsers,
    loadFriends,
    loadFriendRequests,
    logout,
    // loadSubjects,
    // loadAnalytics,
    clearUser
  }
}
