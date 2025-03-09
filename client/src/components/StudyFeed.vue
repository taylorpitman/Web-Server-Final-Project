<script setup lang="ts">
import { ref } from 'vue'
import PostFeed from './PostFeed.vue'

const posts = ref([
  {
    id: 1,
    name: 'Alex',
    avatar: '/src/assets/images/blankpicture.png',
    content: 'Just started a 25-minute Pomodoro session! ⏳',
    mood: '😤 Focused',
    subject: 'Computer Science',
    likes: 4,
    reposts: 0,
    isLiked: false,
    isReposted: false
  },
  {
    id: 2,
    name: 'Sarah',
    avatar: '/src/assets/images/blankpicture.png',
    content: 'Completed a 1-hour study session! 🎉',
    mood: '😊 Motivated',
    subject: 'Physics',
    likes: 10,
    reposts: 2,
    isLiked: false,
    isReposted: false
  },
  {
    id: 3,
    name: 'David',
    avatar: '/src/assets/images/blankpicture.png',
    content: 'Studying "Machine Learning Basics" 🤖',
    mood: '🤔 Confused',
    subject: 'Computer Science',
    likes: 90,
    reposts: 80,
    isLiked: true,
    isReposted: true
  }
])

const handleLike = (post: any) => {
  post.isLiked = !post.isLiked
  post.likes += post.isLiked ? 1 : -1
}

const handleRepost = (post: any) => {
  post.isReposted = !post.isReposted
  post.reposts += post.isReposted ? 1 : -1
}

</script>

<template>
  <div>

    <div class="column is-full">    
      <PostFeed />
      <div class="box">
        <h2 class="title is-4">📖 Study Feed</h2>
        
        <div v-for="post in posts" :key="post.id" class="notification is-success mb-4">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img class="is-rounded" :src="post.avatar" :alt="post.name">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ post.name }}</strong>
                  <br>
                  {{ post.content }}
                  <br>
                  <small>
                    <span class="tag is-light mr-2">{{ post.subject }}</span>
                    <span class="tag is-light">{{ post.mood }}</span>
                  </small>
                </p>
                <div class="level is-mobile">
                  <div class="level-left">
                    <button 
                      class="button is-small is-ghost"
                      :class="{ 'is-danger': post.isLiked }"
                      @click="handleLike(post)"
                    >
                      <span class="icon">
                        <font-awesome-icon icon="fa-heart" />
                      </span>
                      <span>{{ post.likes }}</span>
                    </button>
                    <button 
                      class="button is-small is-ghost ml-2"
                      :class="{ 'is-danger': post.isReposted }"
                      @click="handleRepost(post)"
                    >
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
  color: #1a1116; /* Default icon color */
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

</style>