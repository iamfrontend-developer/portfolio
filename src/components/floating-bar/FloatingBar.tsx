"use client";

import Image, { StaticImageData } from "next/image";
import { useA11y } from "@/components/accessibility/AccessibilityContext";
import styles from "./FloatingBar.module.scss";
import accessibility from "@/assets/images/accessibility.svg";
import parsona from "@/assets/images/parsona.svg";
import getintouch from "@/assets/images/parsona.svg";
import apexfund from "@/assets/images/apexfund.svg";


type ActionItem = {
    label: string;
    icon: StaticImageData | string;
    action?: "accessibility";
};

const actions: ActionItem[] = [
    { label: "Accessibility", icon: accessibility, action: "accessibility" },
    { label: "Persona", icon: parsona },
    { label: "Get in touch", icon: getintouch },
    { label: "Apex Fund", icon: apexfund },
];

export default function FloatingBar() {
    const { toggleWidget } = useA11y()

    const handleAction = (action?: ActionItem["action"]) => {
        if (action === "accessibility") toggleWidget()
    }

    return (
        <nav className={styles.wrapper} aria-label="Floating quick actions" data-no-a11y>
            <ul className={styles.floatingBar}>
                {actions.map(({ label, icon, action }) => (
                    <li
                        key={label}
                        className={styles.item}
                        role="button"
                        tabIndex={0}
                        onClick={() => handleAction(action)}
                        onKeyDown={event => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault()
                                handleAction(action)
                            }
                        }}
                    >
                        <Image src={icon} alt={label} width={20} height={20} />
                        <span>{label}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
