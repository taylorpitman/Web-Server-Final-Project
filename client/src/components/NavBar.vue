<script setup lang="ts">
import { users } from '../data/users'


</script>

<template>
    <div>
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <img class = "navbar-item" src = "/src/assets/studyhive-logo.svg" alt="logo" width = 100 >


            <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
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
                    Profile
                </a>
                </div>
            </div>

 
            </div>

            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <div class="navbar-item is-warninghas-dropdown is-hoverable">
                        <a class="navbar-link">
                            Log In
                        </a>

                        <div class="navbar-dropdown">
                            <a v-for="user in users" 
                            :key="user.id" 
                            class="navbar-item"
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
  min-width: 100px;  /* Ensure dropdown is wide enough for content */
  right: 0;          /* Align to right edge of parent */
  left: auto;        /* Override default left alignment */
}

.navbar-item.has-dropdown {
  position: relative;  /* Ensure proper positioning context */
}

</style>