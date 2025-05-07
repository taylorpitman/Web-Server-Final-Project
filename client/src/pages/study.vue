<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { refSession } from '@/services/authService'
import { getAnalytics } from '@/services/usersService'
import { type Analytics } from '@/services/analyticsService';

// destructure the necessary properties from the useCurrentUser composable
const session = refSession() // session object to manage user sessions
const currentUser  = session.value.user;
const analytics = ref<Analytics | null>(null)

// compute the total study time for today
const studyTimeToday = computed(() => {

})


// compute the total study time for all time
const studyTimeAllTime = computed(() => {

})

onMounted (async () => {
  const userId = session.value.user!.id;
    if (!userId) throw new Error('User not logged in');
    const result = await getAnalytics(session.value.user!.id);
    if (!result) throw new Error('No analytics found for user');

    analytics.value = result;

})

</script>

<template>
  <section class="section">
    <div class="container has-text-centered">
      <h1 class="title is-3 mb-5">📊 Study Statistics</h1>

      <div v-if="currentUser" class="card has-background-warning-light p-5">
        <div class="card-content">
          <div class="content">
            <h2 class="subtitle is-5 mb-4">
              📚 <strong>Current Streak:</strong> {{ analytics?.streak_count }} days
            </h2>
            <h2 class="subtitle is-5 mb-4">
              🎯 <strong>Daily Goal:</strong> {{ currentUser.study_goal }} hours/day
            </h2>
            <h2 class="subtitle is-5">
                📅 <strong>Total Time Studied:</strong> {{ ((analytics?.total_minutes || 0) / 60).toFixed(2) }} hours
            </h2>
            <h2 class="subtitle is-5">
              📈 <strong>Study Sessions:</strong> {{ analytics?.session_count }} 
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
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