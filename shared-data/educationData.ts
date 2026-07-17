export interface EducationEntry {
    title: string;
    major?: string;
    org: string;
    shortOrg?: string;
    campus?: string;
    date: string;
    place: string;
    grade: string;
    type: "University" | "College" | "School";
    mode?: string;
    featured?: boolean;
    color?: "blue" | "indigo" | "emerald";
    courses: string[];
}

export const educationData: EducationEntry[] = [
    {
        title: "Master of Business Administration",
        major: "Business Analytics",
        org: "Birla Institute of Technology and Science",
        shortOrg: "BITS Pilani",
        campus: "Pilani",
        date: "2026 - 2028",
        place: "Pilani, Rajasthan, India",
        grade: "Ongoing",
        type: "University",
        featured: true,
        color: "indigo",
        courses: [
            "Statistical Methods for Analytics",
            "Machine Learning",
            "Data Visualization",
            "Business Intelligence",
            "Predictive Analytics",
            "Financial & Marketing Analytics",
        ],
    },
    {
        title: "Master of Science",
        major: "Data Science",
        org: "International Institute of Information Technology",
        shortOrg: "IIIT Hyderabad",
        campus: "Hyderabad",
        date: "2026 - 2028",
        place: "Hyderabad, Telangana, India",
        grade: "Ongoing",
        type: "University",
        mode: "Online",
        featured: true,
        color: "emerald",
        courses: [
            "Statistical Methods in AI",
            "Data Structures and Algorithms",
            "Database Management Systems",
            "Data Analytics",
            "Optimization Methods",
            "Machine Learning & Generative Models",
        ],
    },
    {
        title: "Bachelor of Technology",
        major: "Computer Science",
        org: "Vellore Institute of Technology",
        shortOrg: "VIT-AP",
        campus: "AP",
        date: "2022 - 2026",
        place: "Amaravati, Andhra Pradesh, India",
        grade: "8.45 CGPA",
        type: "University",
        featured: true,
        color: "blue",
        courses: [
            "Data Structures & Algorithms",
            "Operating Systems",
            "OOP",
            "Software Engineering (Design Patterns, System Design)",
            "Computer Networks",
            "Deep Learning",
            "NoSQL databases",
        ],
    },
    {
        title: "Intermediate Education",
        major: "MPC",
        org: "Sri Chaitanya Junior College",
        date: "2020 - 2022",
        place: "Vijayawada, Andhra Pradesh, India",
        grade: "83.7%",
        type: "College",
        color: "indigo",
        courses: ["Mathematics", "Physics", "Chemistry"],
    },
    {
        title: "Secondary Education",
        org: "Sri Chaitanya High School",
        date: "2020",
        place: "Vijayawada, Andhra Pradesh, India",
        grade: "97.1%",
        type: "School",
        color: "emerald",
        courses: ["Foundation", "General Sciences", "Mathematics"],
    },
];
