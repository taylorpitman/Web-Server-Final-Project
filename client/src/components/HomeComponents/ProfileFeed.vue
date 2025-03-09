<script setup lang="ts">
import { useCurrentUser } from '../../composables/useCurrentUser';

// destructure the necessary properties from the useCurrentUser composable
const { currentUser } = useCurrentUser();
</script>

<template>
  <div>
    <div class="column is-full">
      <!-- display the profile information if currentUser is available -->
      <div class="box" v-if="currentUser">
        <!-- user's avatar -->
        <figure class="image is-128x128 mb-4">
          <img class="is-rounded" :src="currentUser.avatar" :alt="currentUser.name">
        </figure>
        <!-- user's name -->
        <h2 class="title is-5">{{ currentUser.name }}</h2>
        <!-- user's username -->
        <h3 class="subtitle mb-4 is-6">@{{ currentUser.username }}</h3>
        <!-- user's study streak -->
        <p>📚 Study streak: <strong>{{ currentUser.streak }} days</strong></p>
        <!-- user's study goal -->
        <p>🎯 Study goal: <strong>{{ currentUser.study_goal / 60 }} hours</strong></p>
        <!-- button to start a study session -->
        <button class="button is-primary is-fullwidth mt-3">Start Study Session</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  min-width: 350px;
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