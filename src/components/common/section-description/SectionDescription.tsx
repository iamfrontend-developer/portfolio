import styles from "./SectionDescription.module.scss";

type SectionDescriptionProps = {
    description: string;
    className?: string;
};

const SectionDescription = ({
    description,
    className = "",
}: SectionDescriptionProps) => {
    return (
        <p className={`${styles.sectionDescription} ${className}`.trim()}>{description}</p>

    );
};

export default SectionDescription;