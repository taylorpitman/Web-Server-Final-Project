import { ref, computed } from 'vue';
import type { User, Activity } from '../data/users';
import dayjs from 'dayjs';

// reactive reference to the users array
const users = ref<User[]>([
    {
        id: 1,
        username: "study_master",
        name: "Taylor Pitman",
        avatar: "/src/assets/images/blankpicture.png",
        major: "Computer Science",
        year: "Junior",
        subjects: ["Programming", "Data Structures", "Algorithms"],
        streak: 5,
        totalStudyTime: 1200,
        study_goal: 120, // 2 hours per day
        role: "admin",
        activities: [
            { id: 1, username: "study_master", avatar: "/src/assets/images/blankpicture.png", title: "Just started a 25-minute Pomodoro session! ⏳", duration: 25, subject: "Programming", mood: "😤 Focused", likes: 4, reposts: 0, date: "2025-03-01" },
            { id: 2, username: "study_master", avatar: "/src/assets/images/blankpicture.png", title: "Completed a 1-hour study session! 🎉", duration: 60, subject: "Data Structures", mood: "😊 Motivated", likes: 10, reposts: 2, date: "2025-03-02" },
            { id: 3, username: "study_master", avatar: "/src/assets/images/blankpicture.png", title: "Studying 'Machine Learning Basics' 🤖", duration: 90, subject: "Algorithms", mood: "🤔 Confused", likes: 90, reposts: 80, date: "2025-03-03" },
        ],
        friends: [2, 3, 4], // ids of friends
        studyTimeToday: 140,
        studyTimeThisWeek: 600
    },
    {
        id: 2,
        username: "physics_fan",
        name: "Sarah Chen",
        avatar: "/src/assets/images/blankpicture.png",
        major: "Physics",
        year: "Senior",
        subjects: ["Quantum Mechanics", "Thermodynamics", "Calculus"],
        streak: 12,
        totalStudyTime: 2400,
        study_goal: 180, // 3 hours per day
        role: "user",
        activities: [
            { id: 1, username: "physics_fan", avatar: "/src/assets/images/blankpicture.png", title: "Just finished a 2-hour study session on Quantum Mechanics! 🧠", duration: 120, subject: "Quantum Mechanics", mood: "😊 Motivated", likes: 20, reposts: 5, date: "2025-03-01" },
            { id: 2, username: "physics_fan", avatar: "/src/assets/images/blankpicture.png", title: "Thermodynamics is tough, but I'm getting there! 🔥", duration: 60, subject: "Thermodynamics", mood: "😤 Focused", likes: 25, reposts: 6, date: "2025-03-02" },
            { id: 3, username: "physics_fan", avatar: "/src/assets/images/blankpicture.png", title: "Calculus practice session 📚", duration: 90, subject: "Calculus", mood: "🤔 Confused", likes: 30, reposts: 10, date: "2025-03-03" },
        ],
        friends: [1, 4],  // ids of friends
        studyTimeToday: 90,
        studyTimeThisWeek: 200
    },
    {
        id: 3,
        username: "bio_whiz",
        name: "Marcus Rodriguez",
        avatar: "/src/assets/images/blankpicture.png",
        major: "Biology",
        year: "Sophomore",
        subjects: ["Anatomy", "Genetics", "Chemistry"],
        streak: 3,
        totalStudyTime: 800,
        study_goal: 90, // 1.5 hours per day
        role: "user",
        activities: [
            { id: 1, username: "bio_whiz", avatar: "/src/assets/images/blankpicture.png", title: "Anatomy study session - learning about the human body! 🦴", duration: 45, subject: "Anatomy", mood: "😓 Stressed", likes: 5, reposts: 1, date: "2025-03-01" },
            { id: 2, username: "bio_whiz", avatar: "/src/assets/images/blankpicture.png", title: "Genetics is fascinating! 🧬", duration: 60, subject: "Genetics", mood: "😊 Motivated", likes: 8, reposts: 2, date: "2025-03-02" },
            { id: 3, username: "bio_whiz", avatar: "/src/assets/images/blankpicture.png", title: "Late night Chemistry study session 🧪", duration: 90, subject: "Chemistry", mood: "😴 Tired", likes: 12, reposts: 3, date: "2025-03-03" },
        ],
        friends: [1, 4], // ids of friends
        studyTimeToday: 60,
        studyTimeThisWeek: 900 
    },
    {
        id: 4,
        username: "lit_lover",
        name: "Emily Thompson",
        avatar: "/src/assets/images/blankpicture.png",
        major: "English Literature",
        year: "Freshman",
        subjects: ["Creative Writing", "Poetry", "Literary Analysis"],
        streak: 7,
        totalStudyTime: 1500,
        study_goal: 150, // 2.5 hours per day
        role: "user",
        activities: [
            { id: 1, username: "lit_lover", avatar: "/src/assets/images/blankpicture.png", title: "Writing a new poem! ✍️", duration: 90, subject: "Creative Writing", mood: "😊 Motivated", likes: 18, reposts: 4, date: "2025-03-01" },
            { id: 2, username: "lit_lover", avatar: "/src/assets/images/blankpicture.png", title: "Analyzing Shakespeare's works 📖", duration: 120, subject: "Literary Analysis", mood: "😴 Tired", likes: 22, reposts: 5, date: "2025-03-02" },
            { id: 3, username: "lit_lover", avatar: "/src/assets/images/blankpicture.png", title: "Creative Writing workshop 📝", duration: 60, subject: "Creative Writing", mood: "😊 Motivated", likes: 15, reposts: 3, date: "2025-03-03" },
        ],
        friends: [2, 3],  // ids of friends
        studyTimeToday: 0,
        studyTimeThisWeek: 0
    }
]);

// reactive reference to the current user
const currentUser = ref<User | null>(null);

export function useCurrentUser() {
  // function to set the current user
  const setCurrentUser = (user: User) => {
    currentUser.value = user;
  };

  // function to add a new activity to the current user's activities
  const addActivity = (activity: Activity) => {
    if (currentUser.value) {
      currentUser.value.activities.push(activity);
      currentUser.value.totalStudyTime += activity.duration;

      const today = dayjs().startOf('day');
      const startOfWeek = dayjs().startOf('week');

      if (dayjs(activity.date).isAfter(today)) {
        currentUser.value.studyTimeToday += activity.duration;
      }

      if (dayjs(activity.date).isAfter(startOfWeek)) {
        currentUser.value.studyTimeThisWeek += activity.duration;
      }
    }
  };

  // function to delete an activity from the current user's activities
  const deleteActivity = (activityId: number) => {
    if (currentUser.value) {
      const activityIndex = currentUser.value.activities.findIndex(activity => activity.id === activityId);
      if (activityIndex !== -1) {
        const activity = currentUser.value.activities[activityIndex];
        currentUser.value.activities.splice(activityIndex, 1);
        currentUser.value.totalStudyTime -= activity.duration;

        const today = dayjs().startOf('day');
        const startOfWeek = dayjs().startOf('week');

        if (dayjs(activity.date).isAfter(today)) {
          currentUser.value.studyTimeToday -= activity.duration;
        }

        if (dayjs(activity.date).isAfter(startOfWeek)) {
          currentUser.value.studyTimeThisWeek -= activity.duration;
        }
      }
    }
  };

  // function to delete a user from the users array
  const deleteUser = (userId: number) => {
    const userIndex = users.value.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users.value.splice(userIndex, 1);
    }
  };

  // computed property to get the current user's friends
  const friends = computed(() => {
    if (!currentUser.value) return [];
    return currentUser.value.friends
      .map(friendId => users.value.find(user => user.id === friendId))
      .filter((friend): friend is User => friend !== undefined); // type guard to filter out undefined values
  });

  // computed property to get the activities of the current user's friends
  const friendsActivities = computed(() => {
    return friends.value.flatMap(friend => friend.activities);
  });

  return {
    currentUser,
    setCurrentUser,
    addActivity,
    deleteActivity,
    deleteUser,
    friends,
    friendsActivities,
    users, // export the reactive users array
  };
}