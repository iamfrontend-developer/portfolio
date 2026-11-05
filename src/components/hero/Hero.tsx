
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import baseStyle from "../../app/base.module.scss"
import styles from "./Hero.module.scss";
import { heroData } from "@/data/hero";
import Button from "../common/button/Button";

const Hero = () => {
    const containerRef = useRef<HTMLElement>(null);
    const roleRef = useRef<HTMLSpanElement>(null);

    const [imageError, setImageError] = useState(false);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReducedMotion) {
                if (roleRef.current) {
                    roleRef.current.textContent = heroData.roles[0];
                }
                return;
            }

            // Entrance animation
            gsap.from(".heroFade", {
                y: 35,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            });

            // Role typing animation
            const roleElement = roleRef.current;

            if (roleElement === null || heroData.roles.length === 0) return;

            let roleIndex = 0;
            const cursor = { value: 0 };

            function typeRole() {
                const currentRole = heroData.roles[roleIndex];

                gsap.to(cursor, {
                    value: currentRole.length,
                    duration: currentRole.length * 0.075,
                    ease: "none",
                    snap: { value: 1 },

                    onUpdate: () => {
                        if (!roleElement) return;

                        roleElement.textContent = currentRole.slice(
                            0,
                            cursor.value
                        );
                    },

                    onComplete: () => {
                        gsap.delayedCall(1.5, deleteRole);
                    },
                });
            }

            function deleteRole() {
                const currentRole = heroData.roles[roleIndex];

                gsap.to(cursor, {
                    value: 0,
                    duration: currentRole.length * 0.035,
                    ease: "none",
                    snap: { value: 1 },

                    onUpdate: () => {
                        if (!roleElement) return;

                        roleElement.textContent = currentRole.slice(
                            0,
                            cursor.value
                        );
                    },

                    onComplete: () => {
                        roleIndex =
                            (roleIndex + 1) % heroData.roles.length;

                        gsap.delayedCall(0.3, typeRole);
                    },
                });
            }

            typeRole();
        },
        { scope: containerRef }
    );

    return (
        <section
            className={`${styles.hero} ${baseStyle.paddingTb}`}
            id="home"
            ref={containerRef}
            aria-labelledby="hero-title"
        >
            <div className={baseStyle.container}>
                <div className={styles.wrap}>

                    {/* Hero Content */}
                    <div className={`${styles.content} heroFade`}>

                        <div className={styles.eyebrow}>
                            {heroData.eyebrow}
                        </div>

                        <h1 id="hero-title">
                            {heroData.name}
                        </h1>

                        {/* Animated Role */}
                        <div className={styles.role}>
                            <span ref={roleRef} aria-hidden="true" />

                            <span
                                className={styles.caret}
                                aria-hidden="true"
                            />

                            <span className={styles.srOnly}>
                                {heroData.roles.join(", ")}
                            </span>
                        </div>

                        <p className={styles.description}>
                            {heroData.description}
                        </p>

                        {/* Dynamic Action Buttons */}
                        <div className={styles.btns}>
                            {heroData.buttons.map((button) => (
                                <Button
                                    key={button.label}
                                    text={button.label}
                                    as="link"
                                    href={button.href}
                                    variant={button.variant || "primary"}
                                    size="medium"
                                    showArrow={false}
                                    align="left"
                                    className={styles.heroButton}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className={`${styles.avatar} heroFade`}>

                        <span aria-hidden="true">
                            {heroData.fallbackText}
                        </span>

                        {/* {!imageError && (
                            <Image
                                src={heroData.profileImage}
                                alt={heroData.profileAlt}
                                fill
                                priority
                                sizes="(max-width: 760px) 180px, 240px"
                                className={styles.profileImage}
                                onError={() => setImageError(true)}
                            />
                        )} */}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
