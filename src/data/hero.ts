import { StaticImageData } from "next/image";
import profilePhoto from "../assets/images/photo.jpg"


export interface HeroButton {
    label: string;
    href: string;
    variant?:
    | "primary"
    | "primaryDark"
    | "white"
    | "outline"
    | "outlineDark";
}

export interface HeroData {
    stats: any;
    eyebrow: string;
    name: string;
    roles: string[];
    description: string;
    profileImage: StaticImageData;
    profileAlt: string;
    fallbackText: string;
    buttons: HeroButton[];
}

export type HeroStat = {
    id: string;
    value: string;
    label: string;
};


export const heroData: HeroData = {
    eyebrow: "Hello, I'm",

    name: "Mahesh Sutar",

    roles: [
        "Senior Frontend Developer",
        "Senior React Developer",
        "Next.js Developer",
        "Frontend Engineer",
        "UI Engineer",
    ],

    description:
        "Frontend/UI Developer with 6.5+ years of experience building clean, accessible and responsive interfaces with React.js, Next.js and JavaScript. Based in Mumbai, India.",

    profileImage: profilePhoto,

    profileAlt: "Mahesh Sutar",

    fallbackText: "MS",

    buttons: [
        {
            label: "View Projects",
            href: "#projects",
            variant: "primary",
        },
        {
            label: "Daily Thoughts",
            href: "/blog",
            variant: "primaryDark",
        },
        {
            label: "React Lab",
            href: "/practice",
            variant: "primaryDark",
        },
    ],

    stats: [
        { id: "experience", value: "6.5+", label: "Years experience" },
        { id: "projects", value: "12", label: "Selected projects" },
        { id: "companies", value: "3", label: "Companies" },
    ] as HeroStat[],
};
