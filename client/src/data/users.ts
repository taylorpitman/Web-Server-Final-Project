interface User {
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
}

export const users: User[] = [
    {
        id: 1,
        username: "study_master",
        name: "Alex Johnson",
        avatar: "/src/assets/images/blankpicture.png",
        major: "Computer Science",
        year: "Junior",
        subjects: ["Programming", "Data Structures", "Algorithms"],
        streak: 5,
        totalStudyTime: 1200,
        study_goal: 120 // 2 hours per day
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
        study_goal: 180 // 3 hours per day
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
        study_goal: 90 // 1.5 hours per day
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
        study_goal: 150 // 2.5 hours per day
    }
];

export default users;