
import type { StaticImageData } from "next/image";

import nextJs from "../assets/images/skills/nextjs.png";
import sass from "../assets/images/skills/sass.png";
import HTML from "../assets/images/skills/html.png";
import CSS from "../assets/images/skills/css.png";

export type ProjectTechnology = {
    name: string;
    icon?: StaticImageData;
};

export type ProjectItem = {
    id: number;
    name: string;
    category: string;
    description?: string;
    technologies: ProjectTechnology[];
    link: string;
};

export type ProjectsData = {
    eyebrow: string;
    title: string;
    projects: ProjectItem[];
};

export const projectsData: ProjectsData = {
    eyebrow: "portfolio",
    title: "selected projects",

    projects: [
        {
            id: 1,
            name: "Raymond Group",
            category: "Next.js",
            // description: "Corporate website development.",
            technologies: [
                { name: "Next.js", icon: nextJs },
                { name: "Sass", icon: sass },
            ],
            link: "https://www.raymond.in/",
        },
        {
            id: 2,
            name: "ABSLI Gift City",
            category: "Next.js",
            // description: "Modern business platform development.",
            technologies: [
                { name: "Next.js", icon: nextJs },
                { name: "Sass", icon: sass },
            ],
            link: "#",
        },
        {
            id: 3,
            name: "Apex SIF",
            category: "Next.js",
            // description: "Modern business platform development.",
            technologies: [
                { name: "Next.js", icon: nextJs },
                { name: "Sass", icon: sass },
            ],
            link: "#",
        },
        {
            id: 4,
            name: "ABSLI AIF",
            category: "Next.js",
            // description: "Modern business platform development.",
            technologies: [
                { name: "Next.js", icon: nextJs },
                { name: "Sass", icon: sass },
            ],
            link: "#",
        },
        {
            id: 5,
            name: "Aditya Birla Capital",
            category: "HTML",
            // description: "Modern business platform development.",
            technologies: [
                { name: "HTML", icon: HTML },
                { name: "CSS", icon: CSS },
            ],
            link: "#",
        },
        {
            id: 6,
            name: "Aditya Birla Capital",
            category: "HTML",
            // description: "Modern business platform development.",
            technologies: [
                { name: "HTML", icon: HTML },
                { name: "CSS", icon: CSS },
            ],
            link: "#",
        },
        {
            id: 7,
            name: "Aditya Birla ABCD APP",
            category: "HTML",
            // description: "Modern business platform development.",
            technologies: [
                { name: "HTML", icon: HTML },
                { name: "CSS", icon: CSS },
            ],
            link: "#",
        },
        {
            id: 8,
            name: "Denave",
            category: "HTML",
            // description: "Modern business platform development.",
            technologies: [
                { name: "HTML", icon: HTML },
                { name: "CSS", icon: CSS },
            ],
            link: "#",
        },
        {
            id: 9,
            name: "The Heritage Project",
            category: "HTML",
            // description: "Modern business platform development.",
            technologies: [
                { name: "HTML", icon: HTML },
                { name: "CSS", icon: CSS },
            ],
            link: "#",
        },
        {
            id: 10,
            name: "EvolutionCO",
            category: "HTML",
            // description: "Modern business platform development.",
            technologies: [
                { name: "HTML", icon: HTML },
                { name: "CSS", icon: CSS },
            ],
            link: "#",
        },
        {
            id: 11,
            name: "BuzzzWorth",
            category: "HTML",
            // description: "Modern business platform development.",
            technologies: [
                { name: "HTML", icon: HTML },
                { name: "CSS", icon: CSS },
            ],
            link: "#",
        },
        {
            id: 12,
            name: "Weconnect Digital",
            category: "HTML",
            // description: "Modern business platform development.",
            technologies: [
                { name: "HTML", icon: HTML },
                { name: "CSS", icon: CSS },
            ],
            link: "#",
        },
        // {
        //     id: 3,
        //     name: "Portfolio Website",
        //     category: "React",
        //     description: "Personal portfolio website development.",
        //     technologies: [
        //         { name: "React" },
        //         { name: "Sass", icon: sass },
        //     ],
        //     link: "#",
        // },
        // {
        //     id: 4,
        //     name: "Business Landing Page",
        //     category: "HTML",
        //     description: "Responsive business landing page.",
        //     technologies: [
        //         { name: "HTML", icon: sass },
        //         { name: "Sass", icon: sass },
        //     ],
        //     link: "#",
        // },
        // {
        //     id: 5,
        //     name: "Creative Agency",
        //     category: "HTML",
        //     description: "Creative agency website development.",
        //     technologies: [
        //         { name: "HTML" },
        //         { name: "Sass", icon: sass },
        //     ],
        //     link: "#",
        // },
    ],
};
