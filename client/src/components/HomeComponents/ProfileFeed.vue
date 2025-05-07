<script setup lang="ts">
import {getStreak} from '@/services/analyticsService'
import { refSession } from '@/services/authService';
import {onMounted, computed, ref} from 'vue';
import Timer from './Timer.vue'; // Import the Timer component

// destructure the necessary properties from the useCurrentUser composable
const session = refSession(); // session object to manage user sessions
let currentUser = computed(() => session.value.user)
const showTimer = ref(false);

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

const toggleTimer = () => {
  showTimer.value = !showTimer.value;
  if (showTimer.value) {
    // Start the timer
    console.log('Timer started');

  } 
}


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
        <p>📚 Study streak: <strong> days</strong></p>
        <!-- user's study goal -->
        <p>🎯 Study goal: <strong>{{currentUser.study_goal}} hours</strong></p>
        <!-- button to start a study session -->
        <button @click="toggleTimer" class="button is-primary is-fullwidth mt-3">Start/Close Study Timer</button>
        
        <div v-if="showTimer" class="notification  mt-3">
          <div >
            <div class="">
              <Timer :user="currentUser"/>
          </div>
        </div>
        </div>
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