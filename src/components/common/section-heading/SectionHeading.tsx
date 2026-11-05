import styles from "./SectionHeading.module.scss";

type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    id?: string;
    as?: "h1" | "h2" | "h3";
    className?: string;
    titleClassName?: string;
};

const SectionHeading = ({
    eyebrow,
    title,
    id,
    as: Tag = "h2",
    className = "",
    titleClassName = "",
}: SectionHeadingProps) => {
    return (
        <div className={`${styles.headingWrapper} ${className}`.trim()}>
            <div className={styles.eyebrow}>{eyebrow}</div>
            <Tag id={id} className={`${styles.sectionHeading} ${titleClassName}`.trim()}>
                {title}
            </Tag>
        </div>
    );
};

export default SectionHeading;