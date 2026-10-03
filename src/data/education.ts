export type EducationStatus = "completed" | "ongoing";

export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
  highlights: string[];
  skills: string[];
  logo?: string;
  status: EducationStatus;
};

export type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  skills: string[];
};

export const education: EducationItem[] = [
  {
    id: "bs-cs",
    degree: "BS Computer Science",
    institution: "University of Central Punjab",
    location: "Gujranwala, Pakistan",
    startYear: "2023",
    endYear: "Present",
    grade: "CGPA 3.1/4.0",
    description:
      "Building a strong foundation in software engineering, algorithms, and modern product design while shipping real-world UI work.",
    highlights: [
      "Focus on HCI, web technologies, and design systems",
      "Active in campus tech communities and hackathons",
      "Balancing coursework with freelance UI projects",
    ],
    skills: ["JavaScript", "React", "UI/UX", "Algorithms"],
    status: "ongoing",
  },
  {
    id: "intermediate",
    degree: "Intermediate (Pre-Engineering)",
    institution: "Punjab Group of Colleges",
    location: "Gujranwala, Pakistan",
    startYear: "2021",
    endYear: "2023",
    grade: "85%",
    description:
      "Strengthened analytical thinking through mathematics and physics while exploring creative digital design.",
    highlights: [
      "Top performance in mathematics and computing basics",
      "Started visual design and Figma practice",
      "Built early portfolio experiments and mockups",
    ],
    skills: ["Mathematics", "Physics", "Figma", "Design Basics"],
    status: "completed",
  },
  {
    id: "matric",
    degree: "Matriculation (Science)",
    institution: "AL Mustafa Model School",
    location: "Gujranwala, Pakistan",
    startYear: "2019",
    endYear: "2021",
    grade: "90%",
    description:
      "Completed science track with distinction and discovered a lasting interest in technology and design.",
    highlights: [
      "Science group with strong overall academic record",
      "Early exposure to computers and digital tools",
      "Grew curiosity for creative problem-solving",
    ],
    skills: ["Science", "Computers", "Creativity"],
    status: "completed",
  },
];

export const certifications: CertificationItem[] = [
  {
    id: "cert-ui",
    title: "Google UX Design Professional Certificate",
    issuer: "Coursera",
    year: "2024",
    skills: ["UX Research", "Wireframing", "Prototyping"],
  },
  {
    id: "cert-web",
    title: "Modern Web Design Masterclass",
    issuer: "Udemy",
    year: "2023",
    skills: ["HTML/CSS", "Responsive Design", "Typography"],
  },
];
