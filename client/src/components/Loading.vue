<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)
const isFullPage = ref(true)

defineProps<{
  isFullPage: boolean
  modelValue: boolean
  canCancel?: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()


function openLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 10 * 1000)
}
</script>

<template>
  <section>
    <b-field>
      <b-button
        label="Launch loading"
        type="is-primary"
        size="is-medium"
        @click="openLoading"
      />
    </b-field>

    <b-field>
      <b-switch v-model="isFullPage">
        Display loader over full page
      </b-switch>
    </b-field>

    <b-notification :closable="false">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam.
      Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit.

      <b-loading
        v-model="isLoading"
        :is-full-page="isFullPage"
        :can-cancel="true"
      />
    </b-notification>
  </section>
</template>

<style scoped>
</style>
