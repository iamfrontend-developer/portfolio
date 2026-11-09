
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const useScrollAnimations = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const elements = gsap.utils.toArray<HTMLElement>(
            "[data-fade-up]",
            containerRef.current
        );

        elements.forEach((element) => {
            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 60,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

    }, { scope: containerRef });

    return containerRef;
};

export default useScrollAnimations;
