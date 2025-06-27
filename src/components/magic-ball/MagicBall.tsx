import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AnimatedSphere } from './AnimatedSphere';

interface MagicBallProps {
  width?: string | number;
  height?: string | number;
}

const MagicBall: React.FC<MagicBallProps> = ({ width = '100%', height = '100%' }) => {
    return (
        <div 
            style={{ width, height }}
            className="flex items-center justify-center cursor-pointer"
        >
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
                <group scale={0.85}>
                    <AnimatedSphere />
                </group>
                <EffectComposer>
                    <Bloom
                        intensity={1.5}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.3}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default MagicBall; 