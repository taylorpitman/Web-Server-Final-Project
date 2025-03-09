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

export const users: User[] = [
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
        friends: [2, 3, 4] // IDs of friends
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
        friends: [1, 4] // IDs of friends
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
        friends: [1, 4] // IDs of friends
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
        friends: [2, 3] // IDs of friends
    }
];
