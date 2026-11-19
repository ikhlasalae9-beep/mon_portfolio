'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface ClickStar {
  x: number;
  y: number;
  spawnTime: number;
  phase: number;
}

interface TwinkleStar {
  x: number;
  y: number;
  depth: number;
  size: number;
  phase: number;
  speed: number;
}

export function HalftoneNebula() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Try WebGL first, fallback to Canvas2D if not available
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true, antialias: false, depth: false });
    } catch {
      gl = null;
    }

    let animId = 0;
    let isVisible = !document.hidden;

    // Window size & DPR
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    // DPR capped at 2
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mouse coordinates (normalized 0..1 from top-left, and pixel coordinates)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      smoothX: -1000,
      smoothY: -1000,
    };

    // Scroll offset for parallax
    let scrollY = window.scrollY || 0;
    let targetScrollY = scrollY;

    // Clicked stars storage
    const clickedStars: ClickStar[] = [];

    // Background Twinkle stars (pre-generated)
    const starCount = width < 768 ? 45 : 95;
    const backgroundStars: TwinkleStar[] = [];
    for (let i = 0; i < starCount; i++) {
      backgroundStars.push({
        x: Math.random(),
        y: Math.random(),
        depth: 0.15 + Math.random() * 0.85,
        size: Math.random() > 0.8 ? 2.2 : 1.4,
        phase: Math.random() * Math.PI * 2,
        speed: 1.5 + Math.random() * 2.5,
      });
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    resize();

    // Event listeners
    const handlePointerMove = (e: PointerEvent) => {
      if (isTouch) return;
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handlePointerLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    const handleClick = (e: MouseEvent) => {
      const normX = e.clientX / width;
      const normY = e.clientY / height;
      clickedStars.push({
        x: normX,
        y: normY,
        spawnTime: performance.now(),
        phase: Math.random() * Math.PI * 2,
      });
      // Cap at 40 custom stars
      if (clickedStars.length > 40) {
        clickedStars.shift();
      }
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);
    document.addEventListener('visibilitychange', handleVisibility);

    // ─────────────────────────────────────────────────────────────
    // SHADER PROGRAM (WebGL Implementation)
    // ─────────────────────────────────────────────────────────────
    let program: WebGLProgram | null = null;
    let uniforms: Record<string, WebGLUniformLocation | null> = {};

    if (gl) {
      const vsSource = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = (position + 1.0) * 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision highp float;
        varying vec2 vUv;

        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_scroll;
        uniform float u_is_light;
        uniform float u_is_mobile;
        uniform vec2 u_planet_pos;
        uniform float u_planet_radius;

        // Custom stars array (up to 20 packed as x,y,spawnTime,phase)
        uniform int u_num_clicked_stars;
        uniform vec4 u_clicked_stars[20];

        // 2D Simplex Noise
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                              0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                             -0.577350269189626,  // -1.0 + 2.0 * C.x
                              0.024390243902439); // 1.0 / 41.0
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        // FBM (Fractal Brownian Motion)
        float fbm(vec2 p) {
          float value = 0.0;
          float amp = 0.5;
          float freq = 1.0;
          for (int i = 0; i < 4; i++) {
            value += amp * snoise(p * freq);
            freq *= 2.02;
            amp *= 0.5;
          }
          return value;
        }

        void main() {
          vec2 fragCoord = gl_FragCoord.xy;
          vec2 uv = fragCoord / u_resolution;
          vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);

          // Grid dot spacing: 10px desktop, 14px mobile
          float dotSpacing = u_is_mobile > 0.5 ? 14.0 : 10.0;
          vec2 gridCoord = floor(fragCoord / dotSpacing) * dotSpacing + dotSpacing * 0.5;
          vec2 gridUv = gridCoord / u_resolution;

          // Parallax mouse offset
          vec2 mouseNorm = u_mouse / u_resolution;
          vec2 mouseOffset = (mouseNorm - 0.5) * 0.035;

          // Scroll offset parallax (layered)
          float scrollMid = u_scroll * 0.00015;
          float scrollFar = u_scroll * 0.00007;

          // --- Palette Definitions ---
          // Ink Navy #141B2D = (20, 27, 45) / 255.0
          vec3 inkNavy = vec3(0.0784, 0.1059, 0.1765);
          // Darker Navy Deep = vec3(0.05, 0.07, 0.12)
          vec3 deepNavy = vec3(0.051, 0.071, 0.122);
          // Light Navy Surface #1B2440 = (27, 36, 64)
          vec3 lightNavy = vec3(0.1059, 0.1412, 0.2510);
          // Electric Coral #FF5A4E = (255, 90, 78) / 255.0
          vec3 electricCoral = vec3(1.0, 0.3529, 0.3059);
          // Pearl White #F4F1EA = (244, 241, 234) / 255.0
          vec3 pearlWhite = vec3(0.9569, 0.9451, 0.9176);

          // Base background color
          vec3 bgColor = (u_is_light > 0.5) ? pearlWhite : inkNavy;

          // --- 1. NEBULA GAS NOISE at grid coordinate ---
          vec2 gasCoord = (gridUv * aspect) + mouseOffset * 0.5;
          gasCoord.y += scrollMid;
          float t = u_time * 0.035;

          // Swirling domain warping
          vec2 q = vec2(
            fbm(gasCoord + vec2(t * 0.4, -t * 0.3)),
            fbm(gasCoord + vec2(-t * 0.3, t * 0.2))
          );
          vec2 r = vec2(
            fbm(gasCoord + 1.8 * q + vec2(1.7, 9.2) + t * 0.15),
            fbm(gasCoord + 1.8 * q + vec2(8.3, 2.8) - t * 0.12)
          );
          float gas = fbm(gasCoord + 2.5 * r);
          gas = clamp((gas + 0.3) * 0.9, 0.0, 1.0);

          // Mouse gas lighting (dots grow & brighten near pointer)
          float mouseDist = distance(gridCoord, u_mouse);
          float mouseGlow = 0.0;
          if (u_mouse.x > 0.0) {
            float mouseRadius = 180.0;
            mouseGlow = max(0.0, 1.0 - (mouseDist / mouseRadius));
            mouseGlow = pow(mouseGlow, 1.8);
          }

          // Combine gas density with mouse glow
          float totalGas = clamp(gas * 0.85 + mouseGlow * 0.95, 0.0, 1.3);

          // --- 2. DOTTED PLANET (Halftone Shaded Sphere) ---
          vec2 planetScreenPos = u_planet_pos * u_resolution;
          // Apply slight mouse parallax on planet (near layer)
          planetScreenPos += (mouseNorm - 0.5) * -15.0;
          planetScreenPos.y += u_scroll * 0.08;

          float dPlanet = distance(gridCoord, planetScreenPos);
          float planetRadius = u_planet_radius;
          bool isInsidePlanet = dPlanet <= planetRadius;

          float planetDotFactor = 0.0;
          float planetShade = 0.0;
          if (isInsidePlanet) {
            // Sphere normal
            float z = sqrt(planetRadius * planetRadius - dPlanet * dPlanet);
            vec3 normal = normalize(vec3(gridCoord.x - planetScreenPos.x, gridCoord.y - planetScreenPos.y, z));
            // Light source: upper-left
            vec3 lightDir = normalize(vec3(-0.6, -0.6, 0.7));
            planetShade = max(0.0, dot(normal, lightDir));
            // Rim highlight
            float rim = 1.0 - max(0.0, dot(normal, vec3(0.0, 0.0, 1.0)));
            planetShade = clamp(planetShade * 1.2 + pow(rim, 3.0) * 0.35, 0.0, 1.0);
            planetDotFactor = pow(planetShade, 1.3);
          }

          // --- 3. HALFTONE DOT COMPUTATION ---
          vec2 cellCenter = gridCoord;
          float distToCenter = distance(fragCoord, cellCenter);
          float maxDotRadius = dotSpacing * 0.48;

          // Determine dot size & color
          float dotRadius = 0.0;
          vec3 dotColor = electricCoral;
          float dotAlpha = 0.0;

          if (isInsidePlanet) {
            // Planet Halftone
            dotRadius = maxDotRadius * (0.2 + 0.8 * planetDotFactor);
            if (u_is_light > 0.5) {
              dotColor = mix(electricCoral, inkNavy, 1.0 - planetShade);
              dotAlpha = 0.35 + 0.5 * planetShade;
            } else {
              dotColor = mix(electricCoral, pearlWhite, planetShade * 0.6);
              dotAlpha = 0.5 + 0.5 * planetShade;
            }
          } else {
            // Nebula Halftone
            float sizeIntensity = pow(totalGas, 1.4);
            dotRadius = maxDotRadius * clamp(sizeIntensity * 0.95, 0.0, 1.0);

            if (u_is_light > 0.5) {
              // Light mode: low opacity coral & navy dots
              dotColor = mix(inkNavy, electricCoral, totalGas);
              dotAlpha = clamp(totalGas * 0.28, 0.0, 0.32);
            } else {
              // Dark mode: electric coral to pearl highlights
              dotColor = mix(electricCoral, pearlWhite, max(0.0, totalGas - 0.65) * 1.2);
              dotAlpha = clamp(totalGas * 0.75 + mouseGlow * 0.4, 0.0, 0.95);
            }
          }

          // Antialiased circle edge
          float circleEdge = 1.0 - smoothstep(dotRadius - 0.75, dotRadius + 0.75, distToCenter);
          vec3 finalColor = mix(bgColor, dotColor, circleEdge * dotAlpha);

          // --- 4. TWINKLE SPARKLE STARS ---
          // Background twinkling pixel stars
          vec2 uvStar = uv;
          uvStar.y += scrollFar;

          // Pixel star grid
          float starNoise = snoise(uvStar * 60.0 + mouseOffset * 0.1);
          if (starNoise > 0.88) {
            float starTwinkle = 0.5 + 0.5 * sin(u_time * 3.0 + starNoise * 40.0);
            float starDist = length(fract(uvStar * 60.0) - 0.5);
            float starIntensity = smoothstep(0.18, 0.0, starDist) * starTwinkle;

            vec3 starColor = (u_is_light > 0.5) ? inkNavy : pearlWhite;
            float starAlpha = (u_is_light > 0.5) ? 0.35 : 0.85;
            finalColor = mix(finalColor, starColor, starIntensity * starAlpha);
          }

          // --- 5. CLICK-SPAWNED STARS (Hangs a new star at click point) ---
          for (int i = 0; i < 20; i++) {
            if (i >= u_num_clicked_stars) break;
            vec4 cStar = u_clicked_stars[i];
            vec2 cStarScreen = cStar.xy * u_resolution;
            float age = (u_time * 1000.0 - cStar.z) * 0.001; // in seconds
            if (age >= 0.0) {
              float dStar = distance(fragCoord, cStarScreen);
              float twinkle = 0.75 + 0.25 * sin(u_time * 5.0 + cStar.w);

              // 4-point sparkle cross
              vec2 delta = abs(fragCoord - cStarScreen);
              float crossGlow = max(
                smoothstep(12.0, 0.0, delta.x) * smoothstep(2.5, 0.0, delta.y),
                smoothstep(12.0, 0.0, delta.y) * smoothstep(2.5, 0.0, delta.x)
              );
              float centerCore = smoothstep(3.5, 0.0, dStar);
              float spawnFade = min(1.0, age * 3.0); // smooth fade in

              float starGlow = (centerCore * 1.0 + crossGlow * 0.7) * twinkle * spawnFade;
              vec3 cColor = (u_is_light > 0.5) ? electricCoral : mix(pearlWhite, electricCoral, 0.35);
              finalColor = mix(finalColor, cColor, clamp(starGlow, 0.0, 1.0));
            }
          }

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `;

      const createShader = (type: number, src: string) => {
        const shader = gl!.createShader(type);
        if (!shader) return null;
        gl!.shaderSource(shader, src);
        gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
          console.warn('Shader compile failed', gl!.getShaderInfoLog(shader));
          gl!.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);

      if (vs && fs) {
        program = gl.createProgram();
        if (program) {
          gl.attachShader(program, vs);
          gl.attachShader(program, fs);
          gl.linkProgram(program);

          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.warn('Program link error', gl.getProgramInfoLog(program));
            program = null;
          } else {
            gl.useProgram(program);

            // Quad buffer
            const posBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
            gl.bufferData(
              gl.ARRAY_BUFFER,
              new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
              gl.STATIC_DRAW
            );

            const posLoc = gl.getAttribLocation(program, 'position');
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

            // Get uniform locations
            const uniformNames = [
              'u_resolution',
              'u_time',
              'u_mouse',
              'u_scroll',
              'u_is_light',
              'u_is_mobile',
              'u_planet_pos',
              'u_planet_radius',
              'u_num_clicked_stars',
            ];
            uniformNames.forEach((name) => {
              uniforms[name] = gl!.getUniformLocation(program!, name);
            });

            for (let i = 0; i < 20; i++) {
              uniforms[`u_clicked_stars[${i}]`] = gl.getUniformLocation(
                program,
                `u_clicked_stars[${i}]`
              );
            }
          }
        }
      }
    }

    // ─────────────────────────────────────────────────────────────
    // RENDER LOOP
    // ─────────────────────────────────────────────────────────────
    let startTime = performance.now();
    let lastTime = startTime;

    const render = (time: number) => {
      if (!isVisible) return;

      const elapsed = (time - startTime) * 0.001;

      // Smooth mouse interpolation
      mouse.smoothX += (mouse.targetX - mouse.smoothX) * 0.08;
      mouse.smoothY += (mouse.targetY - mouse.smoothY) * 0.08;

      // Smooth scroll interpolation
      scrollY += (targetScrollY - scrollY) * 0.1;

      const isLight = resolvedTheme === 'light' ? 1.0 : 0.0;
      const isMobile = width < 768;

      // Planet position: about x 74%, y 20%; smaller and higher on mobile (x 82%, y 12%)
      const planetNormX = isMobile ? 0.82 : 0.74;
      const planetNormY = isMobile ? 0.12 : 0.20;
      const planetRadiusPx = (isMobile ? 55 : 105) * dpr;

      if (gl && program) {
        gl.useProgram(program);

        gl.uniform2f(uniforms['u_resolution'], canvas.width, canvas.height);
        gl.uniform1f(uniforms['u_time'], elapsed);
        gl.uniform2f(
          uniforms['u_mouse'],
          mouse.smoothX * dpr,
          (height - mouse.smoothY) * dpr // WebGL Y is inverted
        );
        gl.uniform1f(uniforms['u_scroll'], scrollY);
        gl.uniform1f(uniforms['u_is_light'], isLight);
        gl.uniform1f(uniforms['u_is_mobile'], isMobile ? 1.0 : 0.0);
        gl.uniform2f(uniforms['u_planet_pos'], planetNormX, 1.0 - planetNormY);
        gl.uniform1f(uniforms['u_planet_radius'], planetRadiusPx);

        // Upload clicked stars (up to 20)
        const recentStars = clickedStars.slice(-20);
        gl.uniform1i(uniforms['u_num_clicked_stars'], recentStars.length);
        recentStars.forEach((star, idx) => {
          const loc = uniforms[`u_clicked_stars[${idx}]`];
          if (loc) {
            gl!.uniform4f(loc, star.x, 1.0 - star.y, star.spawnTime, star.phase);
          }
        });

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      } else {
        // Fallback Canvas 2D Renderer
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.save();
          ctx.scale(dpr, dpr);

          // Clear base
          ctx.fillStyle = isLight ? '#F4F1EA' : '#141B2D';
          ctx.fillRect(0, 0, width, height);

          // Fallback static/animated halftone dots
          const spacing = isMobile ? 16 : 12;
          const cols = Math.ceil(width / spacing);
          const rows = Math.ceil(height / spacing);

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const x = c * spacing + spacing / 2;
              const y = r * spacing + spacing / 2;

              // Simple wave approximation
              const noiseVal =
                Math.sin(c * 0.1 + elapsed * 0.5) * Math.cos(r * 0.1 - elapsed * 0.4);
              const size = Math.max(0, (noiseVal + 1) * 0.5 * 3);

              if (size > 0.5) {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = isLight
                  ? 'rgba(255, 90, 78, 0.2)'
                  : 'rgba(255, 90, 78, 0.6)';
                ctx.fill();
              }
            }
          }

          // Dotted planet
          const pX = planetNormX * width;
          const pY = planetNormY * height;
          const pRad = isMobile ? 55 : 105;

          ctx.beginPath();
          ctx.arc(pX, pY, pRad, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 90, 78, 0.15)';
          ctx.fill();

          ctx.restore();
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    // If prefers-reduced-motion, render exactly one still frame
    if (prefersReducedMotion) {
      render(0);
    } else {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [resolvedTheme]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      aria-hidden="true"
      style={{ isolation: 'isolate' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
