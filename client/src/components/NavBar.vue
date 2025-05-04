<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCurrentUser } from '../composables/useCurrentUser'
import type { User } from '@/services/usersService'

// destructure the necessary properties and methods from the useCurrentUser composable
const { currentUser, loadUser } = useCurrentUser();

const allUsers  = ref<User[]>([]);

// handle user selection and set the current user
const handleUserSelect = async (user: User) => {
  await loadUser(user.id)                
  sessionStorage.setItem('currentUserId', user.id.toString()) // optional persistence
}

onMounted(async () => {
const { getAll } = await import('@/services/usersService')
  const result = await getAll()
  allUsers.value = result.items}

)
const logout = () => {
  currentUser.value = null
  sessionStorage.removeItem('currentUserId')
}

</script>

<template>
    <div>
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <!-- logo -->
            <img class="navbar-item" src="/src/assets/studyhive-logo.svg" alt="logo" width="100">

            <!-- burger menu for mobile view -->
            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
            <!-- navigation links -->
            <RouterLink class="navbar-item" to="/">
                Home
            </RouterLink>

            <RouterLink class="navbar-item" to = "/study">
                Study
            </RouterLink>

                        <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    Menu
                </a>

                <div class="navbar-dropdown">
                <RouterLink class="navbar-item" to = "/friends">
                    Friends
                </RouterLink>

                <RouterLink class="navbar-item " to = "/notifications">
                    Notifications
                </RouterLink>

                <RouterLink class="navbar-item" to = "/edit-profile">
                    Edit Profile
                </RouterLink>

                <!-- admin settings link, visible only to admin users -->
                <RouterLink class="navbar-item" v-if="currentUser?.role === 'admin'" to = "/admin">
                    Admin Settings
                </RouterLink>
                </div>
            </div>
            </div>

            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <!-- sign up button -->
                    <a  v-if="!currentUser" class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <!-- log in dropdown menu -->

                          <!-- If user is logged in -->
                        <div v-if="currentUser" class="navbar-item">
                            <span>Hello, {{ currentUser.username }}</span>
                            <button class="button navbar-item  is-hoverable is-warning ml-2" @click="logout">
                            Log out
                            </button>
                        </div>


                    <div v-if="!currentUser" class="navbar-item is-warning has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Log in
                        </a>

                        
                        <div class="navbar-dropdown">
                            <a
                                v-for="user in allUsers"
                                :key="user.id"
                                class="navbar-item"
                                @click="handleUserSelect(user)"
                            >
                                <div class="media">
                                <div class="media-content">
                                    <div class="content">
                                    <p>
                                        <strong>{{ user.username }}</strong>
                                    </p>
                                    </div>
                                </div>
                                </div>
                            </a>
                        </div>
                                
                    </div>          
                </div>
            </div>
            </div>
        </div>
        </nav>
    </div>
</template>

<style scoped>
.navbar-dropdown {
  min-width: 100px; 
  right: 0;         
  left: auto;        
}

.navbar-item.has-dropdown {
  position: relative;  /* ensure proper positioning context */
}
</style>