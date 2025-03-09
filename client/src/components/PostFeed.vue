<script setup lang="ts">
import { ref } from 'vue'
import { FontAwesomeIcon } from '../plugins/font-awesome'

const postContent = ref('')
const selectedSubject = ref('')
const selectedMood = ref('')
const isPublic = ref(true)

const subjects = [
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Literature',
  'History',
  'Other'
]

const moods = [
  '😊 Motivated',
  '😤 Focused',
  '😓 Stressed',
  '😴 Tired',
  '🤔 Confused',
  '💪 Productive'
]

const handleSubmit = () => {
  console.log({
    content: postContent.value,
    subject: selectedSubject.value,
    mood: selectedMood.value,
    isPublic: isPublic.value
  })
  postContent.value = ''
}
</script>

<template>
  <div class="container mb-4">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img class="is-rounded" src="/src/assets/images/blankpicture.png" alt="Profile">
            </figure>
          </div>
          <div class="media-content">
            <div class="field">
              <p class="control">
                <textarea 
                  class="textarea" 
                  placeholder="Share a Study Update..."
                  v-model="postContent"
                ></textarea>
              </p>
            </div>
          </div>
        </div>
        
        <div class="level is-flex is-justify-content-center is-mobile">
          <div class="level-left">
            <div class="level-item mr-2">
              <div class="select is-small">
                <select v-model="selectedSubject">
                  <option value="" disabled selected>Subject</option>
                  <option v-for="subject in subjects" :key="subject" :value="subject">
                    {{ subject }}
                  </option>
                </select>
              </div>
            </div>
            
            <div class="level-item mr-2">
              <div class="select is-small">
                <select v-model="selectedMood">
                  <option value="" disabled selected>Mood</option>
                  <option v-for="mood in moods" :key="mood" :value="mood">
                    {{ mood }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <button class="button is-small">
                <span class="icon">
                  <FontAwesomeIcon icon="fa-solid fa-image" />
                </span>
                <span>Add Photo</span>
              </button>
            </div>

            <div class="level-item ml-2">
              <button class="button is-warning is-small">
                <span class="icon">
                  <FontAwesomeIcon icon="fas fa-clock" />
                </span>
                <span>Start Timer?</span>
              </button>
            </div>
          </div>

          <div class="level-right ">
            <div class="level-item mr-2">
              <div class="field has-fixed-width">
                <input 
                  id="publicSwitch" 
                  type="checkbox" 
                  class="switch is-rounded is-small"
                  v-model="isPublic"
                >
                <label for="publicSwitch">{{ isPublic ? 'Public' : 'Private' }}</label>
              </div>
            </div>

            <div class="level-item">
              <button 
                class="button is-primary" 
                @click="handleSubmit"
                :disabled="!postContent.trim() || !selectedSubject || !selectedMood"
              >
                Post
              </button>
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

</style>