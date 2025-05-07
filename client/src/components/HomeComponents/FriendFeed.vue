<script setup lang="ts">
import { ref, onMounted, computed} from 'vue';
import { refSession } from '@/services/authService';
import { getFriendsByUser, type Friend } from '@/services/friendsService'
import {get} from '@/services/usersService'

const session = refSession();
const friends = ref<Friend[]>([]);
let currentUser = computed(() => session.value.user)

onMounted(async () => {
  const user = session.value.user
  if (user) {
    try {
      const response = await getFriendsByUser(user.id)
      console.log('Friends:', response)
      friends.value = response
    } catch (err) {
      console.error('Failed to load friends:', err)
    }
  }
})

</script>

<template>
  <div v-if = "currentUser">
    <div class="column is-full">
      <div class="box">
        <h2 class="title is-5">👥 Friends</h2>
        <ul>
          <li v-for="friend in friends" :key="friend.id">
            <span>🟢 {{friend.name}} (@{{friend.username }}) </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.column {
  min-width: 350px;
}
</style>
