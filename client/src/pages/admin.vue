<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { refSession } from '@/services/authService'
import { type User } from '@/services/usersService'
import { deleteUser, getAll, create, update } from '@/services/usersService'


const session = refSession() // session object to manage user sessions
const users = ref<User[]>([]) // array to hold all users
const showModal = ref(false)
const isEditing = ref(false)
const userForm = ref<Partial<User> & { id?: number }>({})
  
// handle the deletion of a user
const handleDeleteUser = (userId: number) => {
  deleteUser(userId)
  window.location.reload()

}


const openAddModal = () => {
  isEditing.value = false
  userForm.value = {} // clear form
  showModal.value = true
}

const openEditModal = (user: User) => {
  isEditing.value = true
  userForm.value = { ...user }
  showModal.value = true
}

const handleSubmit = async () => {
  if (!userForm.value.username) {
    alert('Username is required')
    return
  }

  if (isEditing.value && userForm.value.id) {

    await update(userForm.value.id, userForm.value)
  } else {
    await create({
      username: userForm.value.username,
      name: userForm.value.name ?? '',
      avatar: userForm.value.avatar ?? '',
      admin: userForm.value.admin ?? false,
      email: userForm.value.email ?? '',
      study_goal: userForm.value.study_goal ?? 0,
    }) // satisfy required fields in NewUser
  }

  const response = await getAll()
  users.value = response.items
  showModal.value = false
}


onMounted(async () => {

  const response = await getAll()
  users.value = response.items

  console.log("role:" , session.value.user?.admin)
})

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
            <th>admin</th>
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
            <td>{{ user.admin }}</td>
            <td class = "is-flex is-gap-2 is-justify-content-flex-start">
              <!-- button to delete the user -->
              <button class="button is-danger is-small" @click="handleDeleteUser(user.id)">delete</button>
              <!-- button to edit the user -->
              <button class="button is-warning is-small" @click="openEditModal(user)">edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- button to add a new user -->
      <button class="button is-primary is-fullwidth mt-3" @click="openAddModal">add user</button>
    </div>


  </div>
    <!-- User Modal -->
    <b-modal v-model="showModal" :active.sync="showModal" has-modal-card trap-focus scroll="keep">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ isEditing ? '✏️ Edit User' : '➕ Add New User' }}
          </p>
        </header>

        <section class="modal-card-body">
          <b-field label="Username" message="Unique handle used for login and display">
            <b-input
              v-model="userForm.username"
              placeholder="Enter username"
              required
              expanded
            />
          </b-field>

          <b-field label="Full Name" message="First and last name (optional)">
            <b-input
              v-model="userForm.name"
              placeholder="e.g. Taylor Pitman"
              expanded
            />
          </b-field>

          <b-field label="Email" message="Email address">
            <b-input
              v-model="userForm.email"
              placeholder="Enter Email"
              required
              expanded
            />
          </b-field>

          <b-field label="study_goal" message="Study Goal in hours (optional)">
            <b-input
              v-model="userForm.study_goal"
              placeholder="Enter Study Goal"
              required
              expanded
            />
          </b-field>

          <b-field label="Avatar Image URL" message="Direct URL to a profile picture">
            <b-input
              v-model="userForm.avatar"
              placeholder="https://example.com/avatar.jpg"
              type="url"
              expanded
            />
          </b-field>

          <b-field label="Admin Privileges">
            <b-switch v-model="userForm.admin" type="is-warning" passive>
              Grant admin access
            </b-switch>
          </b-field>
        </section>

        <footer class="modal-card-foot is-justify-content-space-between">
          <b-button type="is-primary" @click="handleSubmit">
            {{ isEditing ? '💾 Save Changes' : '✅ Create User' }}
          </b-button>
          <b-button type="is-light" @click="showModal = false">Cancel</b-button>
        </footer>
      </div>
    </b-modal>


</template>

<style scoped>
</style>