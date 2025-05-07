
  <script lang="ts" setup>
  import { ref, computed, onUnmounted } from 'vue'
  import { getAnalytics } from '@/services/usersService'
  import { updateAnalytics } from '@/services/analyticsService'
  import { defineProps } from 'vue'
  import type {User} from '@/services/usersService'

  const totalSeconds = ref(25 * 60) // 25 minutes
  const remaining = ref(totalSeconds.value)
  const isRunning = ref(false)
  let intervalId: number | null = null

  const hasUpdated = ref(false);

  const props = defineProps<{
    user: User
  }>()



  const formattedTime = computed(() => {
    const minutes = Math.floor(remaining.value / 60)
    const seconds = remaining.value % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  })
  
  function startTimer() {
    hasUpdated.value = false;
    if (isRunning.value) return
    isRunning.value = true
    intervalId = setInterval(() => {
      if (remaining.value > 0) {
        remaining.value--
      } 
    }, 1000)
  }
  
  function resetTimer() {
    if (intervalId) clearInterval(intervalId)
    remaining.value = totalSeconds.value
    isRunning.value = false
  }
  
  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })



const updateAnalyticsHandler = async () => {
  try {

    if (hasUpdated.value) {
        console.warn('Study time already added.');
        return;
    }

    //get current user from session
    // user current user to get analytics
    //update the analytics with the study time

    const userId = props.user.id;
    if (!userId) throw new Error('User not logged in');
    const analytics = await getAnalytics(userId);
    if (!analytics) throw new Error('No analytics found for user');

    const updated = await updateAnalytics(analytics.id, userId, 25);
    console.log('Analytics updated:', updated);
    hasUpdated.value = true;
  } catch (err) {
    console.error('Failed to update analytics:', err);
  }
};


</script>

<template>
    <div class="box">

      <h2 class="title is-4">Pomodoro Timer</h2>
      <p class="is-size-1 has-text-weight-bold">{{ formattedTime }}</p>
      <div class="buttons is-centered mt-4">
        <button class="button is-success" @click="startTimer" :disabled="isRunning">Start</button>
        <button class="button is-danger" @click="resetTimer">Reset</button>
        <button 
            v-if= "remaining === 0" 
            @click="updateAnalyticsHandler" 
            class="button is-warning" 
            :disabled="!isRunning || hasUpdated">Add Time To Analytics</button>
      </div>
    </div>
  </template>
  
  