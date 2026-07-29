// Deterministic generator for the hero's wireframe-sphere globe. Uses a
// seeded PRNG (never Math.random) so the server-rendered markup and the
// client's first render are byte-identical and React never flags a
// hydration mismatch.
//
// The sphere is built the way flat "globe" icons conventionally are: an
// outer silhouette circle, a fan of full-height meridian ellipses (each
// one's `rx` is animated between 0 and the sphere radius in CSS to fake
// rotation — a meridian edge-on to the viewer is a vertical line, face-on
// it's the full circle), and a handful of static latitude rings. Nodes and
// arcs are projected onto the same sphere so they read as data points on
// its surface rather than a random plexus.

export interface MeridianData {
  id: number;
  delay: number;
}

export interface ParallelData {
  id: number;
  cy: number;
  rx: number;
  ry: number;
}

export interface GlobeNode {
  id: number;
  x: number;
  y: number;
  r: number;
  pulse: boolean;
  delay: number;
}

export interface GlobeArc {
  id: number;
  d: string;
  flow: boolean;
  delay: number;
}

export interface StrayDot {
  id: number;
  x: number;
  y: number;
  r: number;
}

export interface OrbitDot {
  id: number;
  x: number;
  y: number;
  r: number;
}

export interface OrbitData {
  rx: number;
  ry: number;
  tiltDeg: number;
  dots: OrbitDot[];
}

export interface GlobeData {
  viewBox: string;
  center: { x: number; y: number };
  radius: number;
  meridians: MeridianData[];
  parallels: ParallelData[];
  nodes: GlobeNode[];
  arcs: GlobeArc[];
  strays: StrayDot[];
  orbit: OrbitData;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SIZE = 700;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = 250;
const PARALLEL_FLATTEN = 0.32;
const MERIDIAN_COUNT = 6;
const MERIDIAN_DURATION = 60;
const ORBIT_RX = RADIUS * 1.32;
const ORBIT_RY = RADIUS * 0.4;
const ORBIT_TILT_DEG = -16;

function distance(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(ax - bx, ay - by);
}

// Math.cos/sin can differ by a couple of ULPs between the Node.js V8 build
// (SSR) and the browser's V8 build (hydration). Rounding collapses that
// noise so server and client markup match exactly.
function round(value: number, decimals = 2) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

// Projects a point on the sphere's surface (longitude theta, latitude phi,
// both radians) to 2D, matching the convention the meridian/parallel
// ellipses below are drawn with.
function project(theta: number, phi: number) {
  return {
    x: CX + RADIUS * Math.cos(phi) * Math.sin(theta),
    y: CY - RADIUS * Math.sin(phi),
  };
}

export function generateGlobeData(seed = 1337): GlobeData {
  const random = mulberry32(seed);

  const meridians: MeridianData[] = Array.from({ length: MERIDIAN_COUNT }, (_, i) => ({
    id: i,
    delay: round(-((i / MERIDIAN_COUNT) * MERIDIAN_DURATION), 3),
  }));

  const LATITUDES = [-60, -30, 0, 30, 60];
  const parallels: ParallelData[] = LATITUDES.map((latDeg, i) => {
    const lat = (latDeg * Math.PI) / 180;
    const rx = RADIUS * Math.cos(lat);
    return {
      id: i,
      cy: round(CY - RADIUS * Math.sin(lat)),
      rx: round(rx),
      ry: round(rx * PARALLEL_FLATTEN),
    };
  });

  const nodes: GlobeNode[] = [];
  const NODE_COUNT = 54;
  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = random() * Math.PI * 2;
    // Bias toward mid-latitudes so nodes don't bunch at the poles.
    const phi = (random() - 0.5) * Math.PI * 0.82;
    const { x, y } = project(theta, phi);
    const isHub = i % 9 === 0;
    nodes.push({
      id: i,
      x: round(x),
      y: round(y),
      r: round(isHub ? 3 + random() * 1.2 : 1.1 + random() * 1.6),
      pulse: i % 6 === 0,
      delay: round((i % 9) * 0.7, 2),
    });
  }

  const arcs: GlobeArc[] = [];
  const usedPairs = new Set<string>();
  let attempts = 0;
  while (arcs.length < 11 && attempts < 400) {
    attempts++;
    const a = nodes[Math.floor(random() * nodes.length)];
    const b = nodes[Math.floor(random() * nodes.length)];
    if (a.id === b.id) continue;
    const key = a.id < b.id ? `${a.id}-${b.id}` : `${b.id}-${a.id}`;
    if (usedPairs.has(key)) continue;
    const dist = distance(a.x, a.y, b.x, b.y);
    if (dist < 70 || dist > 220) continue;
    usedPairs.add(key);

    const midX = (a.x + b.x) / 2;
    const midY = (a.y + b.y) / 2;
    const awayX = midX - CX;
    const awayY = midY - CY;
    const awayLen = Math.hypot(awayX, awayY) || 1;
    const bow = dist * 0.22;
    const controlX = midX + (awayX / awayLen) * bow;
    const controlY = midY + (awayY / awayLen) * bow;

    arcs.push({
      id: arcs.length,
      d: `M${round(a.x)},${round(a.y)} Q${round(controlX)},${round(controlY)} ${round(b.x)},${round(b.y)}`,
      flow: arcs.length % 3 === 0,
      delay: round((arcs.length % 5) * 1.3, 2),
    });
  }

  const strays: StrayDot[] = [];
  const STRAY_COUNT = 16;
  for (let i = 0; i < STRAY_COUNT; i++) {
    const angle = random() * Math.PI * 2;
    const dist = RADIUS * (1.08 + random() * 0.42);
    strays.push({
      id: i,
      x: round(CX + Math.cos(angle) * dist),
      y: round(CY + Math.sin(angle) * dist * 0.85),
      r: round(0.8 + random() * 1.3),
    });
  }

  const ORBIT_ANGLES = [35, 165, 260];
  const orbit: OrbitData = {
    rx: round(ORBIT_RX),
    ry: round(ORBIT_RY),
    tiltDeg: ORBIT_TILT_DEG,
    dots: ORBIT_ANGLES.map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      return {
        id: i,
        x: round(CX + ORBIT_RX * Math.cos(rad)),
        y: round(CY + ORBIT_RY * Math.sin(rad)),
        r: i === 0 ? 3.2 : 2,
      };
    }),
  };

  return {
    viewBox: `0 0 ${SIZE} ${SIZE}`,
    center: { x: CX, y: CY },
    radius: RADIUS,
    meridians,
    parallels,
    nodes,
    arcs,
    strays,
    orbit,
  };
}
