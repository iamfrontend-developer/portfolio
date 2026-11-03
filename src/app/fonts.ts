import localFont from "next/font/local";

export const mukta = localFont({
    src: [
        {
            path: "../assets/fonts/mukta/Mukta-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/mukta/Mukta-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/mukta/Mukta-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../assets/fonts/mukta/Mukta-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/mukta/Mukta-ExtraBold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-mukta",
    display: "swap",
});