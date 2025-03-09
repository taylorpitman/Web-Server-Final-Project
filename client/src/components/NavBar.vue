<script setup lang="ts">
import { users } from '../data/users'
import { useCurrentUser } from '../composables/useCurrentUser'

// destructure the necessary properties and methods from the useCurrentUser composable
const { currentUser, setCurrentUser } = useCurrentUser();

// handle user selection and set the current user
const handleUserSelect = (user: typeof users[0]) => {
  setCurrentUser(user);
  console.log('User selected:', user);
};
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
            <a class="navbar-item">
                Home
            </a>

            <a class="navbar-item">
                Study
            </a>

                        <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    Menu
                </a>

                <div class="navbar-dropdown">
                <a class="navbar-item">
                    Friends
                </a>
                <a class="navbar-item ">
                    Notifications
                </a>
                <a class="navbar-item">
                    Edit Profile
                </a>

                <!-- admin settings link, visible only to admin users -->
                <a class="navbar-item" v-if="currentUser?.role === 'admin'">
                    admin settings
                </a>
                </div>
            </div>
            </div>

            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <!-- sign up button -->
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <!-- log in dropdown menu -->
                    <div class="navbar-item is-warning has-dropdown is-hoverable">
                        <a class="navbar-link">
                            Log in
                        </a>

                        <div class="navbar-dropdown">
                            <!-- loop through users and display each one as a login option -->
                            <a v-for="user in users" 
                            :key="user.id" 
                            class="navbar-item"
                            @click="handleUserSelect(user)"
                            >
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-32x32">
                                            <img class="is-rounded" :src="user.avatar" :alt="user.name">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <div class="content">
                                            <p>
                                                <strong>{{ user.name }}</strong>
                                                <br>
                                                <small>{{ user.major }}</small>
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