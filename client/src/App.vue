<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import Home from './pages/index.vue'
import Admin from './pages/admin.vue'
import Friends from './pages/friends.vue'
import Study from './pages/study.vue'
import { RouterView } from 'vue-router'

import 'bulma/css/bulma.min.css'
import './assets/custom-bulma.css'
</script>

<template>
  <NavBar />
  <RouterView />

</template>
