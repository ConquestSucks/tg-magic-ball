import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Mesh } from 'three';
import type { EnergyMaterialImpl } from './materials/EnergyMaterial';
import './materials/EnergyMaterial'; // Важно для extend

export const AnimatedSphere = () => {
    const meshRef = useRef<Mesh>(null!);
    const materialRef = useRef<EnergyMaterialImpl>(null!);
    const [hovered, setHover] = useState(false);

    const [{ clickStrength }, clickApi] = useSpring(() => ({ clickStrength: 0 }));
    const [{ scale }, scaleApi] = useSpring(() => ({ scale: 1 }));


    const handleClick = async () => {
        clickApi.start({
            from: { clickStrength: 1 },
            to: { clickStrength: 0 },
            config: { mass: 1, tension: 280, friction: 20 },
        });

        await scaleApi.start({
            to: { scale: 1.1 },
            config: { mass: 1, tension: 180, friction: 12 },
        });

        await new Promise(resolve => setTimeout(resolve, 2000));

        await scaleApi.start({
            to: { scale: 1 },
            config: { mass: 1, tension: 180, friction: 12 },
        });
    };

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.u_time = state.clock.getElapsedTime();
        }
    });
    
    const { hoverValue } = useSpring({
        hoverValue: hovered ? 1 : 0,
        config: { duration: 300 }
    });

    useFrame(() => {
        if (materialRef.current) {
            materialRef.current.u_hovered = hoverValue.get();
            materialRef.current.u_click_strength = clickStrength.get();
        }
    });

    return (
        <a.mesh
            ref={meshRef}
            onClick={handleClick}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={scale}
        >
            <sphereGeometry args={[2, 128, 128]} />
            {/* @ts-expect-error The component is defined using extend */}
            <energyMaterial ref={materialRef} />
        </a.mesh>
    );
}; 