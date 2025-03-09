import { ref, computed } from 'vue';
import type { User, Activity } from '../data/users';
import { users } from '../data/users';

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
    }
  };

  // function to delete an activity from the current user's activities
  const deleteActivity = (activityId: number) => {
    if (currentUser.value) {
      currentUser.value.activities = currentUser.value.activities.filter(activity => activity.id !== activityId);
    }
  };

  // computed property to get the current user's friends
  const friends = computed(() => {
    if (!currentUser.value) return [];
    return currentUser.value.friends
      .map(friendId => users.find(user => user.id === friendId))
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
    friends,
    friendsActivities,
  };
}