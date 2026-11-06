import Image from "next/image";
import baseStyle from "../../app/base.module.scss";
import styles from "./Projects.module.scss";
import type { ProjectsData } from "@/data/projects";
import SectionHeading from "../common/section-heading/SectionHeading";
import nextJs from "../../assets/images/skills/nextjs.png"
import sass from "../../assets/images/skills/sass.png"
import Button from "../common/button/Button";

type ProjectsProps = {
    data: ProjectsData;
};

const Projects = ({ data }: ProjectsProps) => {
    return (
        <section id="project" className={`${styles.projects} ${baseStyle.paddingTb}`} aria-labelledby="about-title">
            <div className={baseStyle.container}>
                <div className={styles.sectionWrapper}>
                    <SectionHeading
                        id="about-title"
                        eyebrow={data.eyebrow}
                        title={data.title}
                        className={styles.aboutHeading}
                    />

                    <div className={styles.fitlersTabs}>
                        <div className={styles.filters}>
                            <button className={styles.on}>All</button>
                            <button>Next.Js</button>
                            <button>HTML</button>
                        </div>
                    </div>

                    <div className={styles.projectsGrid}>
                        <a href="javascript:;" className={styles.projectCard}>
                            <div className={styles.projectCardTop}>
                                <div className={styles.developedTech}>
                                    <Image
                                        src={nextJs}
                                        alt="Next Js"
                                        width={32}
                                        height={32}
                                        className={styles.developedTechIcon}
                                    />
                                    <Image
                                        src={sass}
                                        alt="Next Js"
                                        width={32}
                                        height={32}
                                        className={styles.developedTechIcon}
                                    />
                                </div>
                            </div>
                            <h3 className={styles.projectName}>Raymond Group</h3>
                            <Button as="link" size="medium" text={"view"} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;