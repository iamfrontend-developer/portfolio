import Image from "next/image";
import baseStyle from "../../app/base.module.scss";
import styles from "./About.module.scss";
import type { AboutData } from "@/data/about";
import SectionHeading from "../common/section-heading/SectionHeading";
import SectionDescription from "../common/section-description/SectionDescription";

type AboutProps = {
    data: AboutData;
};

const About = ({ data }: AboutProps) => {
    return (
        <section id="about" className={`${styles.about} ${baseStyle.paddingTb}`} aria-labelledby="about-title">
            <div className={baseStyle.container}>
                <div className={styles.grid}>
                    <div>
                        <SectionHeading
                            id="about-title"
                            eyebrow={data.eyebrow}
                            title={data.title}
                            className={styles.aboutHeading}   // optional
                        />
                        {/* <p className={styles.sectionDescription}>{data.description}</p> */}
                        <SectionDescription description={data.description} />

                        <ul className={`${styles.chips} ${styles.highlights}`}>
                            {data.highlights.map((item) => (
                                <li key={item} className={styles.chip}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.eyebrow}>{data.skillsTitle}</div>

                        <ul className={`${styles.chips} ${styles.skills}`}>
                            {data.skills.map(({ name, icon, invertOnDark }) => (
                                <li key={name} className={styles.chip}>
                                    {icon && (
                                        <Image
                                            src={icon}
                                            alt=""
                                            width={16}
                                            height={16}
                                            className={invertOnDark ? styles.invert : undefined}
                                        />
                                    )}
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