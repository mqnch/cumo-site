"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;

varying vec3 vPosition;
varying vec3 vNormal;
varying float vNoise;

// Simplex noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

float fbm(vec3 x) {
  float v = 0.0;
  float a = 0.5;
  vec3 shift = vec3(100.0);
  for (int i = 0; i < 4; ++i) {
    v += a * snoise(x);
    x = x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  vNormal = normal;
  
  // Create more organic, liquid-like morphing
  vec3 noisePos = position * 1.8 + uTime * 0.12; 
  float noise = fbm(noisePos);
  
  // Mouse interaction: Sharper, more magnetic pull
  float distToMouse = distance(position.xy, uMouse); 
  float pullEffect = smoothstep(2.0, 0.0, distToMouse);
  
  // Balanced noise for less spiky feel
  float finalNoise = noise * (1.1 + pullEffect * 0.3);
  
  // Calculate final displacement with more power
  vec3 newPosition = position + normal * (finalNoise * 1.2);
  newPosition += normal * pullEffect * 0.15; 
  
  vNoise = noise;
  vPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;

varying vec3 vPosition;
varying vec3 vNormal;
varying float vNoise;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  // Enhanced Silver Palette
  vec3 color1 = vec3(1.0, 1.0, 1.0);      // Pure Silver
  vec3 color2 = vec3(0.85, 0.88, 0.95); // Cool Silver
  vec3 color3 = vec3(0.60, 0.65, 0.75); // Shadow Silver
  
  vec3 normal = normalize(vNormal);
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  
  // High-contrast lighting for 3D depth
  vec3 lightDir = normalize(vec3(5.0, 5.0, 5.0));
  float diff = max(0.0, dot(normal, lightDir));
  
  float mixVal = smoothstep(-0.5, 0.5, vNoise);
  vec3 baseColor = mix(color1, color2, mixVal);
  baseColor = mix(baseColor, color3, smoothstep(0.1, -0.6, vNoise) * 0.5);
  
  // Stronger Specular
  vec3 halfDir = normalize(lightDir + viewDirection);
  float spec = pow(max(0.0, dot(normal, halfDir)), 64.0);
  
  // Transparency with Fresnel
  float fresnel = pow(1.0 - max(0.0, dot(normal, viewDirection)), 2.0);
  
  // Highlights
  vec3 lighting = vec3(diff * 0.1); 
  lighting += vec3(spec * 1.2);    // Very sharp highlight
  lighting += vec3(fresnel * 0.6); // Strong rim light
  
  vec3 finalColor = baseColor + lighting;
  
  // Grain and Iridescence
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  float grain = (random(st + uTime * 0.01) - 0.5) * 0.06; 
  finalColor += grain;
  
  vec3 irid = vec3(0.05, 0.05, 0.1) * sin(fresnel * 8.0 + uTime * 0.5);
  finalColor += irid;

  // Restore transparency
  float alpha = 0.85 - (fresnel * 0.35); // transparent edges

  gl_FragColor = vec4(finalColor, alpha);
}
`;

const Blob = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  
  const targetMouse = useRef(new THREE.Vector2(100, 100));
  const currentMouse = useRef(new THREE.Vector2(100, 100));
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(100, 100) },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  const meshXOffset = 0;
  const meshYOffset = -viewport.height / 2 - 0.8;

  const isMouseOut = useRef(true);
  const hasMovedSinceFocus = useRef(false);
  const pointerNorm = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      hasMovedSinceFocus.current = true;
      isMouseOut.current = false;
      pointerNorm.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerNorm.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseLeave = () => {
      isMouseOut.current = true;
      hasMovedSinceFocus.current = false;
    };
    
    const handleMouseEnter = () => {
        // Wait for first move to deactivate isMouseOut
    };

    const handleFocus = () => {
        isMouseOut.current = true;
        hasMovedSinceFocus.current = false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isMouseOut.current = true;
        hasMovedSinceFocus.current = false;
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleFocus);
    
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleFocus);
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      
      materialRef.current.uniforms.uResolution.value.set(
        state.size.width * state.viewport.dpr,
        state.size.height * state.viewport.dpr
      );
      
      if (isMouseOut.current || !hasMovedSinceFocus.current) {
        targetMouse.current.set(100.0, 100.0);
      } else {
        const mouseWorldX = (pointerNorm.current.x * state.viewport.width) / 2;
        const mouseWorldY = (pointerNorm.current.y * state.viewport.height) / 2;
        
        targetMouse.current.set(
          mouseWorldX - meshXOffset,
          mouseWorldY - meshYOffset
        );
      }
      
      currentMouse.current.lerp(targetMouse.current, 0.04); 
      materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    }
    
    if (meshRef.current) {
        meshRef.current.rotation.y = time * 0.05;
        meshRef.current.rotation.z = time * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={[meshXOffset, meshYOffset, 0]}>
      <sphereGeometry args={[2.0, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export const FluidBlob = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0x000000), 0);
        }}
      >
        <Blob />
      </Canvas>
    </div>
  );
};
