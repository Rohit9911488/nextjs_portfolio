"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { generateGlobeData } from "@/lib/globe";
import styles from "./GlobeNetwork.module.css";

const DATA = generateGlobeData();
const CLIP_ID = "globe-sphere-clip";

export default function GlobeNetwork() {
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const group = groupRef.current;
    if (!group) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    }

    function tick() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      group?.style.setProperty("--parallax-x", `${currentX * 10}px`);
      group?.style.setProperty("--parallax-y", `${currentY * 8}px`);
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const { center, radius, orbit } = DATA;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden"
    >
      <div
        className="absolute rounded-full bg-foreground opacity-[0.05] blur-3xl dark:opacity-[0.08]"
        style={{
          width: "clamp(360px, 60vw, 760px)",
          height: "clamp(360px, 60vw, 760px)",
        }}
      />

      <svg
        viewBox={DATA.viewBox}
        focusable="false"
        role="presentation"
        className="w-[clamp(360px,120vw,600px)] max-w-none text-foreground/70 opacity-80 sm:w-[clamp(480px,70vw,860px)] dark:opacity-70"
        style={{ aspectRatio: "1 / 1" }}
      >
        <defs>
          <clipPath id={CLIP_ID}>
            <circle cx={center.x} cy={center.y} r={radius} />
          </clipPath>
        </defs>

        <g ref={groupRef} className={styles.parallax}>
          <g>
            {DATA.strays.map((dot) => (
              <circle
                key={`s${dot.id}`}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill="currentColor"
                fillOpacity={0.3}
              />
            ))}
          </g>

          <g
            className="hidden sm:block"
            style={{
              transform: `rotate(${orbit.tiltDeg}deg)`,
              transformOrigin: `${center.x}px ${center.y}px`,
            }}
          >
            <g
              className={styles.orbitSpin}
              style={
                {
                  "--cx": `${center.x}px`,
                  "--cy": `${center.y}px`,
                } as CSSProperties
              }
            >
              <ellipse
                cx={center.x}
                cy={center.y}
                rx={orbit.rx}
                ry={orbit.ry}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.2}
                strokeWidth={0.7}
              />
              {orbit.dots.map((dot) => (
                <circle
                  key={`o${dot.id}`}
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.r}
                  fill="currentColor"
                  fillOpacity={0.7}
                />
              ))}
            </g>
          </g>

          <circle
            cx={center.x}
            cy={center.y}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.32}
            strokeWidth={1}
          />

          <g clipPath={`url(#${CLIP_ID})`}>
            <g>
              {DATA.parallels.map((parallel) => (
                <ellipse
                  key={`p${parallel.id}`}
                  cx={center.x}
                  cy={parallel.cy}
                  rx={parallel.rx}
                  ry={parallel.ry}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.18}
                  strokeWidth={0.7}
                />
              ))}
            </g>

            <g>
              {DATA.meridians.map((meridian) => (
                <ellipse
                  key={`m${meridian.id}`}
                  className={styles.meridian}
                  cx={center.x}
                  cy={center.y}
                  rx={radius}
                  ry={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.26}
                  strokeWidth={0.7}
                  style={
                    {
                      "--r": `${radius}px`,
                      "--delay": `${meridian.delay}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </g>

            <g>
              {DATA.arcs.map((arc) => (
                <path
                  key={`a${arc.id}`}
                  d={arc.d}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={arc.flow ? 0.6 : 0.3}
                  strokeWidth={arc.flow ? 1.1 : 0.7}
                  strokeDasharray={arc.flow ? "6 10" : undefined}
                  strokeLinecap="round"
                  className={arc.flow ? styles.lineFlow : undefined}
                  style={
                    arc.flow ? ({ "--delay": `${arc.delay}s` } as CSSProperties) : undefined
                  }
                />
              ))}
            </g>

            <g>
              {DATA.nodes.map((node) => (
                <circle
                  key={`n${node.id}`}
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill="currentColor"
                  fillOpacity={node.pulse ? 0.9 : 0.6}
                  className={node.pulse ? styles.nodePulse : undefined}
                  style={
                    node.pulse ? ({ "--delay": `${node.delay}s` } as CSSProperties) : undefined
                  }
                />
              ))}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
