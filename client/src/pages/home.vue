<script setup lang="ts">
import FriendFeed from '@/components/HomeComponents/FriendFeed.vue';
import ProfileFeed from '@/components/HomeComponents/ProfileFeed.vue';
import StudyFeed from '@/components/HomeComponents/StudyFeed.vue';
</script>

<template>
  <main class = "container mt-5 is-flex is-justify-content-center" >
    <div class = "columns is-8" >
      <ProfileFeed />
      <StudyFeed />
      <FriendFeed />
    </div>
  </main>
</template>
