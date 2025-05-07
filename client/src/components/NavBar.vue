<script setup lang="ts">
import { ref, onMounted } from 'vue'
import  { getAll, type User } from '@/services/usersService'

import { isLoggedIn, login, logout, refSession } from '@/services/authService';
// destructure the necessary properties and methods from the useCurrentUser composable
import { computed } from 'vue'

const currentUser = computed(() => session.value.user)

const users = ref<User[]>([]); // array to hold all users
const session = refSession(); // session object to manage user sessions
console.log('Current user:', currentUser); // log the current user

getAll()
  .then((response) => {
    users.value = response.items; // populate the users array with the response data
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });

// handle user selection and set the current user
const handleUserSelect = async (user: User) => {
  login(user.id); // log in the user
  sessionStorage.setItem('user', JSON.stringify(user)); // store the user in session storage
  console.log('User selected:', user); // log the selected user
}

const handleLogout = async () => {
  logout(); // log out the user
  sessionStorage.removeItem('user'); // remove the user from session storage
  window.location.reload(); // reload the page to reflect the changes
}

onMounted(async () => {
  const stored = sessionStorage.getItem('user')
  if (stored) {
    session.value.user = JSON.parse(stored)
    if (session.value.user) {
      login(session.value.user.id)
    }
  }

  const response = await getAll()
  users.value = response.items

  console.log("role:" , session.value.user!.admin)
})


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
            <div v-if ="session.user" class="navbar-start">
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

                    <!-- admin settings link, visible only to admin users -->
                    <RouterLink class="navbar-item" v-if="currentUser?.admin" to = "/admin">
                        Admin Settings
                    </RouterLink>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <!-- sign up button -->
                    <!-- <a  v-if="!isLoggedIn" class="button is-primary">
                        <strong>Sign up</strong>
                    </a> -->
                    <!-- log in dropdown menu -->

                          <!-- If user is logged in -->
                        <div v-if= "session.user" class="navbar-item">
                            <span>Hello, {{ session.user?.username }}</span>
                            <button class="button navbar-item  is-hoverable is-warning ml-2" @click="handleLogout">
                            Log out
                            </button>
                        </div>


                    <div v-if = "!session.user" class="navbar-item is-warning has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Log in
                        </a>

                        
                        <div class="navbar-dropdown">
                            <a
                                v-for="user in users"
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