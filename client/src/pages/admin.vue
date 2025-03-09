<script setup lang="ts">
import { ref } from 'vue'
import { useCurrentUser } from '../composables/useCurrentUser'

// destructure the necessary properties and methods from the useCurrentUser composable
const { deleteUser, users } = useCurrentUser()

// handle the deletion of a user
const handleDeleteUser = (userId: number) => {
  deleteUser(userId)
}
</script>

<template>
  <div>

    <div class="box">
      <h2 class="title">User Management</h2>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>profile picture</th>
            <th>id</th>
            <th>username</th>
            <th>name</th>
            <th>role</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>

          <!-- loop through the users and display each one -->
          <tr v-for="user in users" :key="user.id">
            <td>
              <figure class="image is-48x48">
                <img class="is-rounded
                " :src="user.avatar" :alt="user.name">
              </figure>
            </td>
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.role }}</td>
            <td class = "is-flex is-gap-2 is-justify-content-flex-start">
              <!-- button to delete the user -->
              <button class="button is-danger is-small" @click="handleDeleteUser(user.id)">delete</button>
              <!-- button to edit the user -->
              <button class="button is-warning is-small">edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- button to add a new user -->
      <button class="button is-primary is-fullwidth mt-3">add user</button>
    </div>
  </div>
</template>

<style scoped>
</style>