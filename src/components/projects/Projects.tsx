
"use client";

import Image from "next/image";
import { useState } from "react";

import baseStyle from "../../app/base.module.scss";
import styles from "./Projects.module.scss";

import type { ProjectsData } from "@/data/projects";
import SectionHeading from "../common/section-heading/SectionHeading";
import useScrollAnimations from "@/hooks/useScrollAnimations";

type ProjectsProps = {
    data: ProjectsData;
};

const Projects = ({ data }: ProjectsProps) => {
    const containerRef = useScrollAnimations();

    const [activeFilter, setActiveFilter] = useState("All");

    // Generate unique filter categories
    const filters = [
        "All",
        ...Array.from(
            new Set(data.projects.map((project) => project.category))
        ),
    ];

    // Calculate filter count
    const getFilterCount = (filter: string) => {
        if (filter === "All") {
            return data.projects.length;
        }

        return data.projects.filter(
            (project) => project.category === filter
        ).length;
    };

    // Filter projects
    const filteredProjects =
        activeFilter === "All"
            ? data.projects
            : data.projects.filter(
                (project) => project.category === activeFilter
            );

    return (
        <section
            ref={containerRef}
            id="project"
            className={`${styles.projects} ${baseStyle.paddingTb}`}
            aria-labelledby="project-title"
        >
            <div className={baseStyle.container}>
                <div className={styles.sectionWrapper}>

                    {/* Section Heading */}
                    <div className={styles.headingWrapperSec} data-fade-up>
                        <SectionHeading
                            id="project-title"
                            eyebrow={data.eyebrow}
                            title={data.title}
                            className={styles.aboutHeading}
                        />
                    </div>

                    {/* Project Filters */}
                    <div className={styles.fitlersTabs} data-fade-up>
                        <div className={styles.filters}>
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    type="button"
                                    className={
                                        activeFilter === filter
                                            ? styles.on
                                            : ""
                                    }
                                    onClick={() => setActiveFilter(filter)}
                                    aria-pressed={activeFilter === filter}
                                >
                                    {filter}

                                    <span className={styles.filterCount}>
                                        ({getFilterCount(filter)})
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className={styles.projectsGrid} data-fade-up>
                        {filteredProjects.map((project) => (
                            <a
                                href={project.link}
                                key={project.id}
                                className={styles.projectCard}

                                target={
                                    project.link.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    project.link.startsWith("http")
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                            >
                                <div className={styles.projectCardTop}>
                                    <div className={styles.developedTech}>
                                        {project.technologies.map((tech) => (
                                            <div
                                                className={styles.techItem}
                                                key={tech.name}
                                                title={tech.name}
                                            >
                                                {tech.icon ? (
                                                    <Image
                                                        src={tech.icon}
                                                        alt={tech.name}
                                                        width={32}
                                                        height={32}
                                                        className={styles.developedTechIcon}
                                                    />
                                                ) : (
                                                    <span className={styles.techName}>
                                                        {tech.name}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.projectCardContent}>
                                    <h3 className={styles.projectName}>
                                        {project.name}
                                    </h3>

                                    <p className={styles.projectDescription}>
                                        {project.description}
                                    </p>

                                    <div className={styles.viewbutton}>
                                        Visit Site
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <p className={styles.noProjects}>
                            No projects found.
                        </p>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Projects;
