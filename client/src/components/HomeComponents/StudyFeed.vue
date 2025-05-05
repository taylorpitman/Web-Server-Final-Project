<script setup lang="ts">
import PostFeed from '@/components/HomeComponents/PostFeed.vue';
import { refSession } from '@/services/authService';
import { onMounted, computed } from 'vue';

const session = refSession(); // reactive session object
const currentUser = computed(() => session.value.user); // derived reactive current user

onMounted(() => {
  const stored = sessionStorage.getItem('user');
  if (stored) {
    session.value.user = JSON.parse(stored);
  }
});
</script>

<template>
  <div >
    <div v-if="currentUser" class="column is-full ">
      <PostFeed />
      <div class="box">
        <h2 class="title is-4">📖 Study Feed</h2>

        <!-- Single dummy post block for layout -->
        <div class="notification is-success mb-4">
          <div class="is-flex is-justify-content-end">
            <button class="delete is-danger"></button>
          </div>

          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img class="is-rounded" src="../../assets/images/blankpicture.png" alt="Avatar" />
              </figure>
            </div>

            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ currentUser.name }}</strong>
                  <br />
                  This is a placeholder post.
                  <br />
                  <small>
                    <span class="tag is-light mr-2">#study</span>
                    <span class="tag is-light">#hive</span>
                  </small>
                </p>

                <div class="level is-mobile">
                  <div class="level-left">
                    <button class="button is-small is-ghost">
                      <span class="icon">
                        <font-awesome-icon icon="fa-heart" />
                      </span>
                      <span>Like</span>
                    </button>

                    <button class="button is-small is-ghost ml-2">
                      <span class="icon">
                        <font-awesome-icon icon="fa-retweet" />
                      </span>
                      <span>Repost</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> <!-- post block -->
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
  color: #1a1116;
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
