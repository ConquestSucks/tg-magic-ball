import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// --- Шейдер для энергетического эффекта ---

export const EnergyMaterial = shaderMaterial(
  // Uniforms
  {
    u_time: 0,
    u_hovered: 0,
    u_click_strength: 0,
  },
  // Vertex Shader: искажает геометрию
  /*glsl*/`
    uniform float u_time;
    uniform float u_click_strength;
    varying vec3 v_normal;
    varying vec3 v_position;

    // Simplex Noise для искажения
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.wz + h.yz * x12.xw;
      return 130.0 * dot(m, g);
    }
    
    void main() {
        v_normal = normal;
        v_position = position;

        // Базовая "кипящая" анимация, амплитуда уменьшена для более слабого эффекта
        float displacement = snoise(position.xy * 0.4 + u_time * 0.2) * 0.1;

        // Дополнительная деформация при клике, амплитуда тоже уменьшена
        float click_wobble = snoise(position.yx * 1.0 + u_time * 1.5) * u_click_strength * 0.15;

        vec3 newPosition = position + normal * (displacement + click_wobble);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment Shader
  /*glsl*/`
    uniform float u_hovered;
    varying vec3 v_normal;
    varying vec3 v_position;
    
    void main() {
        // Эффект Френеля для свечения по краям
        vec3 view_dir = normalize(cameraPosition - v_position);
        float fresnel = 1.0 - dot(view_dir, v_normal);
        float glow = pow(fresnel, 4.0);

        // Яркость при наведении
        glow += u_hovered * 0.5;
        
        glow = clamp(glow, 0.0, 1.0);

        // Цвет свечения
        vec3 glow_color = vec3(0.1, 0.5, 1.0);
        
        vec3 final_color = glow_color * glow;

        gl_FragColor = vec4(final_color, 1.0);
    }
  `
);

extend({ EnergyMaterial });

export interface EnergyMaterialImpl {
  u_time: number;
  u_hovered: number;
  u_click_strength: number;
} 