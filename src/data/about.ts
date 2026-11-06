import type { StaticImageData } from "next/image";
import html5 from "../assets/images/skills/html.png"
import css3 from "../assets/images/skills/css.png"
import javascript from "../assets/images/skills/javascript.png"
import react from "../assets/images/skills/react.png"
import nextjs from "../assets/images/skills/nextjs.png"
import sass from "../assets/images/skills/sass.png"
import tailwind from "../assets/images/skills/tailwand.png"
import bootstrap from "../assets/images/skills/bootstrap.png"
import jquery from "../assets/images/skills/jquery.png"
import gsap from "../assets/images/skills/gsap.png"
import git from "../assets/images/skills/git.png"

export type Skill = {
    name: string;
    icon?: StaticImageData | string;     // file name in public/icons, without ".svg"
    invertOnDark?: boolean;
};

export type AboutData = {
    eyebrow: string;
    title: string;
    description: string;
    highlights: string[];
    skillsTitle: string;
    skills: Skill[];
};

export const aboutData: AboutData = {
    eyebrow: "About",
    title: "Clean, responsive, accessible",
    description:
        "Frontend/UI Developer delivering responsive web interfaces with HTML5, CSS3, JavaScript, jQuery, Bootstrap, Sass/SCSS, Tailwind CSS, React.js and Next.js. I'm seeking opportunities as a Senior Frontend Developer, Senior React Developer, Next.js Developer, Frontend Engineer or UI Engineer.",
    highlights: [
        "Responsive & pixel-conscious interfaces",
        "Reusable UI components",
        "Cross-browser layouts",
        "Animation & interaction",
    ],
    skillsTitle: "Skills",
    skills: [
        { name: "HTML5", icon: html5 },
        { name: "CSS3", icon: css3 },
        { name: "JavaScript", icon: javascript },
        { name: "React", icon: react },
        { name: "Next.js", icon: nextjs, invertOnDark: true },
        { name: "Sass", icon: sass },
        { name: "Tailwind CSS", icon: tailwind },
        { name: "Bootstrap", icon: bootstrap, },
        { name: "jQuery", icon: jquery },
        { name: "GSAP", icon: gsap, invertOnDark: true },
        { name: "Git", icon: git },
        // { name: "UI Design" },
        // { name: "Design Thinking" },
        // { name: "Interaction Design" },
        // { name: "Responsive Design" },
    ],
};