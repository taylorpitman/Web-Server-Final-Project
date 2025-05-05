<script setup lang="ts">
import {getStreak} from '@/services/analyticsService'
import { refSession } from '@/services/authService';
import {onMounted, computed} from 'vue';

// destructure the necessary properties from the useCurrentUser composable
const session = refSession(); // session object to manage user sessions
let currentUser = computed(() => session.value.user)

onMounted(async () => {
  const stored = sessionStorage.getItem('user')
  if (stored) {
    session.value.user = JSON.parse(stored)
    if (session.value.user) {
      getStreak(session.value.user.id)
      currentUser = computed(() => session.value.user)
    }
  }
})


</script>

<template>
  <div v-if = "currentUser" >
    <div class="column is-full">
      <!-- display the profile information if currentUser is available -->
      <div class="box">
        <!-- user's avatar -->
        <figure class="image is-128x128 mb-4">
          <img class="is-rounded" src='../../assets/images/blankpicture.png' :alt="currentUser.name">
        </figure>
        <!-- user's name -->
        <h2 class="title is-5">{{ currentUser.name }}</h2>
        <!-- user's username -->
        <h3 class="subtitle mb-4 is-6">@{{ currentUser.username }}</h3>
        <!-- user's study streak -->
        <p>📚 Study streak: <strong>days</strong></p>
        <!-- user's study goal -->
        <p>🎯 Study goal: <strong>{{currentUser.study_goal}} hours</strong></p>
        <!-- button to start a study session -->
        <button class="button is-primary is-fullwidth mt-3">Start Study Session</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  width: 350px;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.title {
  margin: 0;
  padding: 0;
}
</style>