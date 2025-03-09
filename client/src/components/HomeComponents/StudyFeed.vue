<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCurrentUser } from '../../composables/useCurrentUser';
import PostFeed from './PostFeed.vue';

// destructure the necessary properties and methods from the useCurrentUser composable
const { currentUser, friendsActivities, deleteActivity } = useCurrentUser();

// compute the posts to be displayed in the feed, combining current user's activities and friends' activities
const posts = computed(() => {
  if (!currentUser.value) return [];
  return [
    ...currentUser.value.activities,
    ...friendsActivities.value
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // sort by date in descending order
});

// handle the deletion of a post by calling the deleteActivity method
const handleDelete = (activityId: number) => {
  deleteActivity(activityId);
};
</script>

<template>
  <div v-if="currentUser">
    <div class="column is-full">
      <!-- component to create new posts -->
      <PostFeed />
      <div class="box">
        <h2 class="title is-4">📖 Study Feed</h2>
        
        <!-- loop through the posts and display each one -->
        <div v-for="post in posts" :key="post.id" class="notification is-success mb-4">
          <div class = "is-flex is-justify-content-end">
            <!-- show delete button only for the current user's posts -->
            <div v-if="post.username === currentUser.username"> 
              <button class="delete is-danger" @click="handleDelete(post.id)"></button>
            </div>
          </div>
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img class="is-rounded" :src="post.avatar" :alt="'pfp'">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ post.username }}</strong>
                  <br>
                  {{ post.title }}
                  <br>
                  <small>
                    <span class="tag is-light mr-2">{{ post.subject }}</span>
                    <span class="tag is-light">{{ post.mood }}</span>
                  </small>
                </p>
                
                <div class="level is-mobile">
                  <div class="level-left">
                    
                    <!-- like button -->
                    <button class="button is-small is-ghost">
                      <span class="icon">
                        <font-awesome-icon icon="fa-heart" />
                      </span>
                      <span>{{ post.likes }}</span>
                    </button>

                    <!-- repost button -->
                    <button class="button is-small is-ghost ml-2">
                      <span class="icon">
                        <font-awesome-icon icon="fa-retweet" />
                      </span>
                      <span>{{ post.reposts }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- show login prompt if no current user is logged in 
        NOTE: I am not sure why this isn't in the middle of the page... 
        probably to do with home.vue styles
  -->
  <div v-else class="login-prompt">
    <div class="is-flex is-flex-direction-column">
      <h1 class="title">Welcome to Study Hive! Please Log In...</h1>
      <p class="subtitle">Taylor has Admin access. Menu > Admin Settings</p>
    </div>
  </div>
</template>

<style scoped>
.media-content .content p {
  margin-bottom: 0.5rem;
}

.tag {
  font-size: 0.75rem;
}

.tag.is-light {
  background-color: #fff;
  color: #363636;
}

.button.is-ghost {
  background: none;
  border: none;
  padding: 0.5em;
  transition: all 0.3s ease;
  color: #1a1116; /* default icon color */
}

.button.is-ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}

.level-left .button + .button {
  margin-left: 1rem;
}

.icon {
  margin-right: 0.25rem;
}

.login-prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  text-align: center;
}
</style>