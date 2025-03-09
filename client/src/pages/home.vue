<script setup lang="ts">
import FriendFeed from '@/components/FriendFeed.vue';
import ProfileFeed from '@/components/ProfileFeed.vue';
import StudyFeed from '@/components/StudyFeed.vue';
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
