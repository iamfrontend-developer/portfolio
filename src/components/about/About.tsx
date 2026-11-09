
"use client";

import Image from "next/image";
import baseStyle from "../../app/base.module.scss";
import styles from "./About.module.scss";
import type { AboutData } from "@/data/about";
import SectionHeading from "../common/section-heading/SectionHeading";
import SectionDescription from "../common/section-description/SectionDescription";
import useScrollAnimations from "../../hooks/useScrollAnimations";

type AboutProps = {
    data: AboutData;
};

const About = ({ data }: AboutProps) => {
    const containerRef = useScrollAnimations();

    return (
        <section
            ref={containerRef}
            id="about"
            className={`${styles.about} ${baseStyle.paddingTb}`}
            aria-labelledby="about-title"
        >
            <div className={baseStyle.container}>
                <div className={styles.grid}>

                    <div className={styles.headingWrapperSec} data-fade-up>
                        <SectionHeading
                            id="about-title"
                            eyebrow={data.eyebrow}
                            title={data.title}
                            className={styles.aboutHeading}
                        />

                        <SectionDescription description={data.description} />

                        <ul className={`${styles.chips} ${styles.highlights}`}>
                            {data.highlights.map((item) => (
                                <li key={item} className={styles.chip}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.card} data-fade-up>
                        <div className={styles.eyebrow}>
                            {data.skillsTitle}
                        </div>

                        <ul className={`${styles.chips} ${styles.skills}`}>
                            {data.skills.map(({ name, icon, invertOnDark }) => (
                                <li key={name} className={styles.skillChip}>
                                    <div className={styles.skillIconBox}>
                                        {icon && (
                                            <Image
                                                src={icon}
                                                alt=""
                                                width={16}
                                                height={16}
                                                className={invertOnDark ? styles.invert : undefined}
                                            />
                                        )}
                                    </div>
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
