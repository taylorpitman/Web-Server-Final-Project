<script setup lang="ts">
import { useCurrentUser } from '../../composables/useCurrentUser';

// destructure the necessary properties from the useCurrentUser composable
const { currentUser, friends } = useCurrentUser();
</script>

<template>
  <div v-if="currentUser">
    <div class="column is-full">
      <div class="box">
        <h2 class="title is-5">👥 Friends</h2>
        <ul>
          <!-- loop through the friends and display each one -->
          <li v-for="friend in friends" :key="friend.id">
            <span>🟢 {{ friend.name }} (@{{ friend.username }}) </span>
          </li>
        </ul>
        <!-- button to view all friends -->
        <button class="button is-link is-light is-fullwidth mt-3">View All Friends</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  min-width: 350px;
}
</style>