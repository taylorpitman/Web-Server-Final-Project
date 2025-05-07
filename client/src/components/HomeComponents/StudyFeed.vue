<script setup lang="ts">
import PostFeed from '@/components/HomeComponents/PostFeed.vue';
import { refSession } from '@/services/authService';
import { buildFeed, remove, updateLikes } from '@/services/postsService';
import { ref, onMounted, computed, watch } from 'vue';
import type { Post } from '@/services/postsService'; 

const session = refSession(); // reactive session object
const currentUser = computed(() => session.value.user); // derived reactive current user
const posts = ref<Post[]>([]); // reactive array to hold posts

onMounted(async () => {
  const stored = sessionStorage.getItem('user');
  if (stored) {
    session.value.user = JSON.parse(stored);
  }

  if (session.value.user) {
    const result = await buildFeed({
      user_id: session.value.user.id,
      limit: 10,
      offset: 0
    });

    posts.value = result.items;

    console.log('Posts:', posts.value); //undefined
  }
});


//handle delete post
const handleDelete = async (postId: number) => {
  try {
    await remove(postId);
    console.log('Post deleted:', postId);
    posts.value = posts.value.filter((post) => post.id !== postId);
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

const updateLike = async (postId: number, increment: number) => {
  try {
    console.log('Updating likes for post ID:', postId);
    const updatedPost = await updateLikes(postId, increment);
    console.log('Updated post:', updatedPost);

    if (!updatedPost) {
      console.error('Updated post is undefined!');
      return;
    }

    posts.value = posts.value.map((post) =>
      post.id === updatedPost.id
        ? { ...post, ...updatedPost } // merge updated data with existing post
        : post
    );

  } catch (error) {
    console.error('Error updating likes:', error);
  }
}

</script>

<template>
  <div >
    <div v-if="currentUser" class="column is-full ">
      <PostFeed />
      <div class="box">
        <h2 class="title is-4">📖 Study Feed</h2>
        <div v-for="post in posts">

        <div class="notification is-success mb-4">
          <div v-if="post.user_id === currentUser.id" class="is-flex is-justify-content-end">
            <button class="delete is-danger"
            @click = "handleDelete(post.id)"></button>
          </div>

          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img class="is-rounded" src="../../assets/images/blankpicture.png" alt="Avatar" />
              </figure>
            </div>

            <div class="media-content">
              <div  class="content">
                <div>
                  <div class ="is-flex is-gap-1">
                    <strong>{{ post.users?.name }}</strong>
                    <p>(@ {{ post.users?.username }})</p>
                  </div>
                   {{ post.content }}
                  <br />
                  <small>
                    <span class="tag is-warning">{{ post.subjects?.name }}</span>
                  </small>
                </div>

                <div class="level is-mobile mt-2 ">
                  <div class="level-left">
                    <button @click="updateLike(post.id, 1)" class="button tag is-flex is-gap-1 is-danger is-small is-ghost">
                      <span class="icon">
                        <font-awesome-icon icon="fa-heart" />
                      </span>
                      <span>{{ post.likes }}</span>
                    
                      <span>Likes</span>
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
