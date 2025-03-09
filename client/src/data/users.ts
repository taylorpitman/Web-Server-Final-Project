export interface User {
    id: number;
    username: string;
    name: string;
    avatar: string;
    major: string;
    year: string;
    subjects: string[];
    streak: number;
    totalStudyTime: number; // in minutes
    study_goal: number; // daily study goal in minutes
    role: string;
    activities: Activity[];
    friends: number[]; // Array of friend user IDs
    studyTimeToday: number; // total study time for today in minutes
    studyTimeThisWeek: number; // total study time for this week in minutes
}

export interface Activity {
    id: number;
    username: string;
    avatar: string;
    title: string;
    duration: number; // in minutes
    subject: string;
    mood: string;
    likes: number;
    reposts: number;
    date: string;
}

