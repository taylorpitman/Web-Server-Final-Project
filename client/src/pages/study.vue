<script setup lang="ts">
import { computed } from 'vue'
import { useCurrentUser } from '../composables/useCurrentUser'

// destructure the necessary properties from the useCurrentUser composable
const { currentUser } = useCurrentUser()

// compute the total study time for today
const studyTimeToday = computed(() => {
  if (!currentUser.value) return 0
  return currentUser.value.studyTimeToday
})

// compute the total study time for this week
const studyTimeThisWeek = computed(() => {
  if (!currentUser.value) return 0
  return currentUser.value.studyTimeThisWeek
})

// compute the total study time for all time
const studyTimeAllTime = computed(() => {
  if (!currentUser.value) return 0
  return currentUser.value.totalStudyTime
})
</script>

<template>
  <div class = "is-flex is-flex-direction-column is-align-items-center p-6">
    <h1 class="title">Study Statistics</h1>
    <div v-if="currentUser" class="card p-5 is-warning">
      <h2 class="subtitle">📚 Study Streak: <strong>{{ currentUser.streak }} days</strong></h2>
      <h2 class="subtitle">🎯 Study Goal: <strong>{{ currentUser.study_goal / 60 }} hours/day</strong></h2>
      <h2 class="subtitle">📅 Studied Today: <strong>{{ studyTimeToday / 60 }} hours</strong></h2>
      <h2 class="subtitle">📅 Studied This Week: <strong>{{ studyTimeThisWeek / 60 }} hours</strong></h2>
      <h2 class="subtitle">📅 Studied All Time: <strong>{{ studyTimeAllTime / 60 }} hours</strong></h2>
    </div>
  </div>
</template>

<style scoped>
.box {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
}

.subtitle {
  margin-bottom: 0.5rem;
}
</style>