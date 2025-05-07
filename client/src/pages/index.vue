<script setup lang="ts">
import FriendFeed from '@/components/HomeComponents/FriendFeed.vue';
import ProfileFeed from '@/components/HomeComponents/ProfileFeed.vue';
import StudyFeed from '@/components/HomeComponents/StudyFeed.vue';
import { refSession } from '@/services/authService';
import { computed, onMounted } from 'vue';
const session = refSession();
let currentUser = computed(() => session.value.user)

onMounted(async () => {
  const stored = sessionStorage.getItem('user')
  if (stored) {
    session.value.user = JSON.parse(stored)
    if (session.value.user) {
      currentUser = computed(() => session.value.user)
    }
  }
})

</script>


<template>
  <main class = "container ml-0 mt-5" >
    <div v-if="currentUser" class = "columns is-center m-0 is-8" >
      <ProfileFeed />
      <StudyFeed />
      <FriendFeed /> 
    </div>
    <div v-else class="has-text-centered">
      <h1 class="title">Welcome to StudyHive!</h1>
      <p class="subtitle">Please log in to see your personalized feed.</p>
      <p class="subtitle">Study Bee is an Admin.</p>
      <p class="subtitle">About The Pomodoro Method:</p>
<p>
  The Pomodoro Technique is a time management method that encourages focused work in short, structured intervals. 
  A typical cycle consists of 25 minutes of deep work followed by a 5-minute break. 
  After completing four cycles, you take a longer break (15–30 minutes). 
  This approach helps reduce burnout, improve concentration, and make progress on tasks without distractions.
</p>    </div>
  </main>
</template>

