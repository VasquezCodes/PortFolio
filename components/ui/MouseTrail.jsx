"use client";

import { useEffect, useRef } from "react";

const MouseTrail = () => {
    const coords = useRef({ x: 0, y: 0 });
    const circlesRef = useRef([]);

    const colors = [
        "#001a80",
        "#00187a",
        "#001773",
        "#00156d",
        "#001466",
        "#001260",
        "#001159",
        "#000f53",
        "#000e4d",
        "#000c46",
        "#000b40",
        "#000939",
        "#000833",
        "#00062d",
        "#000526",
        "#000320",
        "#000219",
        "#000013",
        "#00000d",
        "#000000"
    ];

    useEffect(() => {
        const circles = circlesRef.current;
        let animationFrameId;

        // Initialize circle positions
        circles.forEach((circle) => {
            if (circle) {
                circle.x = 0;
                circle.y = 0;
            }
        });

        const handleMouseMove = (e) => {
            coords.current.x = e.clientX;
            coords.current.y = e.clientY;
        };

        const animateCircles = () => {
            let x = coords.current.x;
            let y = coords.current.y;

            circles.forEach((circle, index) => {
                if (!circle) return;

                circle.style.left = x - 12 + "px";
                circle.style.top = y - 12 + "px";
                circle.style.scale = (circles.length - index) / circles.length;

                circle.x = x;
                circle.y = y;

                const nextCircle = circles[index + 1] || circles[0];
                if (nextCircle) {
                    x += (nextCircle.x - x) * 0.3;
                    y += (nextCircle.y - y) * 0.3;
                }
            });

            animationFrameId = requestAnimationFrame(animateCircles);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animateCircles();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            {colors.map((color, index) => (
                <div
                    key={index}
                    ref={(el) => (circlesRef.current[index] = el)}
                    className="fixed pointer-events-none z-50 rounded-full hidden md:block"
                    style={{
                        height: "24px",
                        width: "24px",
                        backgroundColor: color,
                        top: "-100px",
                        left: "-100px",
                    }}
                />
            ))}
        </>
    );
};

export default MouseTrail;
