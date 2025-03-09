<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router'

import 'bulma/css/bulma.min.css'
import './assets/custom-bulma.css'
</script>

<template>
  <NavBar />
  <RouterView />

</template>
