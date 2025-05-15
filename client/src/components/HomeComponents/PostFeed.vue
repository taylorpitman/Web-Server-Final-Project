<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { refSession } from '@/services/authService'
import { getByUser, type Subject } from '@/services/subjectsService'
import { create } from '@/services/subjectsService'
import { create as createPost } from '@/services/postsService'

import { getSubjectsMatching } from '@/services/subjectsService'; // You'll define this

const inputValue = ref(''); 
const postContent = ref('')
const selectedSubject = ref<Subject | null>(null)
const session = refSession()
const subjects = ref<Subject[]>([])

const options = ref<{
    value: Subject;
    label: string;
}[]>([]);

// watch for + Add New Subject
watch(selectedSubject, async (newVal) => {
  if ((newVal as any) === 'newSubject') {
    const name = window.prompt('Enter a new subject name:')
    if (name && name.trim() !== '') {
      const newSubject = await create({ name, user_id: session.value.user!.id })
      subjects.value = [...subjects.value, newSubject]

      selectedSubject.value = newSubject
    } else {
      selectedSubject.value!.name = ''
    }
  }
})

watch(inputValue, (newVal) => {
  console.log('inputValue changed:', newVal)
})

watch(subjects, () => {
  console.log('Subjects loaded:', subjects.value.map(s => s.name))
})


async function onType(name: string) {

  try {
    const results = await getSubjectsMatching(name, session.value.user!.id);
    options.value = results.map((subject: Subject) => ({
      value: subject,
      label: subject.name
    }));


  } catch (err) {
    console.error('Error fetching subjects:', err);
    subjects.value = [];
  }
}

// onMounted(async () => {
//   if (session.value.user) {
//     const response = await getByUser(session.value.user.id)
//     subjects.value = response;
//     console.log('subjects.value:', subjects.value)
//   }
// })


const handlePostSubmit = async () => {
  try {
    const post = {
      user_id: session.value.user!.id,
      subject_id: (selectedSubject.value as Subject).id,
      content: postContent.value,
      mood_id: 1, // mood is not implemented yet
      likes: 0,
      dislikes: 0
    }

    const response = await createPost(post)
    console.log('Post created:', response)

    // Reset form
    postContent.value = ''
    selectedSubject.value!.name = ''
    // selectedMood.value = ''
    // isPublic.value = true
    window.location.reload()
  } catch (error) {
    console.error('Failed to submit post:', error)
  }
}
</script>

<template>
  <div class="container mb-4 post-feed">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <!-- user's profile picture -->
            <figure class="image is-64x64">
              <img class="is-rounded" src="/src/assets/images/blankpicture.png" alt="profile">
            </figure>
          </div>
          <div class="media-content">
            <div class="field">
              <p class="control">
                <!-- textarea for post content -->
                <textarea 
                  class="textarea" 
                  placeholder="Share a study update..."
                  v-model="postContent"
                ></textarea>
              </p>
            </div>
          </div>
        </div>

        <div class="level">
          <div class="level-left">
            <div class="level-item ">
              <button class=" mr-5 is-warning button" value="newSubject">Add Subject</button>
              <div class="container">
                <o-field label="Subject">
                  <o-autocomplete
                    v-model="selectedSubject"
                    :input="inputValue"
                    :options="options"

                    @input="onType"
                    backend-filtering
                    :debounce="500"
                    clearable         
                    placeholder="e.g Web Development"
                    icon="search"
                    open-on-focus
                  />
                </o-field>

                <div v-if="selectedSubject" class="box is-primary has-text-centered">
                  Subject: <strong>{{ selectedSubject.name }}</strong>
                  <button class="delete is-small mx-2" @click="selectedSubject === null"></button>
                </div> 

            </div>
          </div>

           <div class="level-right">
            <div class="level-item">
              <!-- button to submit the post -->
              <button 
                class="button is-primary" 
                @click="handlePostSubmit"
                :disabled="!postContent.trim() || !selectedSubject "
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
}

.textarea {
  border: none;
  box-shadow: none;
  padding: 0.5rem;
  resize: none;
  min-height: 80px;
}

.textarea:focus {
  box-shadow: none;
}

.button.is-primary {
  transition: background-color 0.3s ease;
}

.switch[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  outline: 0;
  position: relative;
  width: 2.75em;
  height: 1.5em;
  margin: 0.25em;
  cursor: pointer;
  border-radius: 999px;
  background: #dbdbdb;
  transition: background-color 0.3s ease;
}

.switch[type="checkbox"]::before {
  content: "";
  display: block;
  position: absolute;
  width: 1.25em;
  height: 1.25em;
  background: white;
  border-radius: 50%;
  top: 0.125em;
  left: 0.125em;
  transition: transform 0.3s ease;
  will-change: transform;
}

.o-autocomplete__menu {
  z-index: 9999;
  background: white;
  position: absolute;
}

.switch[type="checkbox"]:checked {
  background-color: #61a6ab;
}

.switch[type="checkbox"]:checked::before {
  transform: translateX(1.25em);
}

.switch[type="checkbox"]:hover {
  opacity: 0.9;
}

.field.has-fixed-width {
  display: flex;
  align-items: center;
  width: 100px;   
}

.field.has-fixed-width label {
  font-size: 1.0rem;
  white-space: nowrap;
}

.post-feed {
  min-width: 500px;
}

</style>