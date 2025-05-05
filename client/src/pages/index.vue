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
    <div v-if="currentUser" class = "columns m-0 is-8" >
      <ProfileFeed />
      <StudyFeed />
      <FriendFeed /> 
    </div>
    <div v-else class="has-text-centered">
      <h1 class="title">Welcome to StudyHive!</h1>
      <p class="subtitle">Please log in to see your personalized feed.</p>
    </div>
  </main>
</template>

