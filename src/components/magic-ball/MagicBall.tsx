import React, { useState, useEffect, useRef, useCallback } from "react";

// Добавляем типы параметров функции lerp
function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

const MagicBall: React.FC = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    // Значения для scale и freq - используем useRef с инициализацией
    const scaleRef = useRef<number>(15);
    const freqRef = useRef<number>(0.02);

    const targetScale = useRef<number>(15);
    const targetFreq = useRef<number>(0.02);

    const requestRef = useRef<number | null>(null);

    // Оборачиваем animate в useCallback, чтобы eslint не ругался
    const animate = useCallback(() => {
        scaleRef.current = lerp(scaleRef.current, targetScale.current, 0.05);
        freqRef.current = lerp(freqRef.current, targetFreq.current, 0.05);

        const turbulence = document.getElementById("turbulence");
        if (turbulence) {
            turbulence.setAttribute(
                "baseFrequency",
                `${freqRef.current.toFixed(5)} ${(
                    freqRef.current * 1.5
                ).toFixed(5)}`
            );
        }
        const displacement = document.getElementById("displacement");
        if (displacement) {
            displacement.setAttribute("scale", scaleRef.current.toFixed(2));
        }

        requestRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [animate]);

    const handleClick = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        targetScale.current = 35;
        targetFreq.current = 0.05;

        setTimeout(() => {
            targetScale.current = 15;
            targetFreq.current = 0.02;

            setTimeout(() => {
                setIsAnimating(false);
            }, 1500);
        }, 1500);
    };

    return (
        <div className="flex items-center justify-center grow">
            <svg
                width="182"
                height="182"
                viewBox="0 0 182 182"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer", userSelect: "none", overflow: "visible" }}
                onClick={handleClick}
            >
                <defs>
                    <filter id="wavy" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence
                            id="turbulence"
                            type="turbulence"
                            baseFrequency="0.02 0.03"
                            numOctaves={3}
                            result="turbulence"
                        />
                        <feDisplacementMap
                            id="displacement"
                            in="SourceGraphic"
                            in2="turbulence"
                            scale={15}
                            xChannelSelector="R"
                            yChannelSelector="G"
                        />
                    </filter>

                    <linearGradient
                        id="paint0_linear"
                        x1={0}
                        y1={0}
                        x2={182}
                        y2={182}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="#C875EC" stopOpacity={0.9} />
                        <stop offset="50%" stopColor="#2E1EDF" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#F63775" stopOpacity={0.7} />
                    </linearGradient>
                </defs>

                <circle
                    cx={91}
                    cy={91}
                    r={90}
                    fill="url(#paint0_linear)"
                    filter="url(#wavy)"
                    fillOpacity={0.8}
                />
            </svg>

        </div>
    );
};

export default MagicBall;
