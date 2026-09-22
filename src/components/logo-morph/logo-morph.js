import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const LOGOS = [
  { name: 'Salomon', file: 'salomon.svg' },
  { name: 'WPP', file: 'wpp.svg' },
  { name: 'VML', file: 'vml.png' },
  { name: 'Finisterre', file: 'finisterre.svg', light: true },
  { name: 'Beauty Bay', file: 'beauty-bay.png' },
  { name: 'Atomic Skis', file: 'atomic-logo.png' },
  { name: 'Armada Skis', file: 'armada.svg' },
  { name: 'Shopify Plus', file: 'shopify-plus.png' },
  { name: 'Essity', file: 'essity.svg' },
  { name: 'Selfridges', file: 'selfridges.png' },
  { name: 'Fenwick', file: 'fenwick.webp' },
  { name: 'Vileda', file: 'vileda.png' },
  { name: 'Lindt', file: 'lindt.png' },
  { name: 'TENA', file: 'tena-seeklogo.png' },
  { name: 'British American Tobacco', file: 'british-american-tobacco-seeklogo.png' },
  { name: 'Guinness', file: 'guinness.png' },
  { name: 'AKQA', file: 'akqa.svg' },
  { name: 'Peak Performance', file: 'peak-performance-logo.svg' },
  { name: 'Amer Sports', file: 'amer-sport.png' },
];
const MORPH = 2200;
const COLUMNS = 4;
const CYCLE = MORPH * COLUMNS;
const PARTICLES = 1400;

function shuffleLogos(logos) {
  const shuffled = [...logos];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Section = styled.section`
  margin: 2rem 0 3rem;
  padding: 2.4rem 2.8rem 1.4rem;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  color: #000;
  background: #fff8eb;
  border-top: 1px solid #e8e8e8;
  border-radius: 3px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
  }
  h2 {
    font-size: 2rem;
    line-height: 1.3;
  }
  canvas {
    display: block;
    width: 100%;
    height: 140px;
  }
  @media (max-width: 600px) {
    padding: 2rem 1.6rem 1rem;
    canvas {
      height: 300px;
    }
  }
`;

const Fallback = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2rem;
  padding: 3rem 0;
  figure {
    display: grid;
    place-items: center;
    gap: 1rem;
  }
  img {
    width: 100%;
    max-width: 165px;
    height: 5rem;
    object-fit: contain;
    background: #fff;
    border-radius: 2px;
  }
  figcaption {
    font-size: 1.4rem;
    line-height: 1.3;
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

// Extract actual logo pixels, including opaque PNG wordmarks and reversed SVGs.
function loadLogo(logo) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      try {
        const source = document.createElement('canvas');
        const scale = Math.min(
          logo.file.endsWith('.svg') ? Infinity : 1,
          1200 / image.naturalWidth,
          600 / image.naturalHeight
        );
        source.width = Math.max(1, Math.round(image.naturalWidth * scale));
        source.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = source.getContext('2d');
        context.drawImage(image, 0, 0, source.width, source.height);
        const pixels = context.getImageData(0, 0, source.width, source.height);
        let left = source.width,
          top = source.height,
          right = 0,
          bottom = 0;
        for (let y = 0; y < source.height; y++) {
          for (let x = 0; x < source.width; x++) {
            const i = (y * source.width + x) * 4;
            const luminance =
              (pixels.data[i] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
            // Preserve antialiased edges instead of turning them into jagged binary pixels.
            const coverage =
              ((logo.light ? luminance : 255 - luminance) *
                pixels.data[i + 3]) /
              255;
            const ink = coverage > 30;
            pixels.data[i] = 0;
            pixels.data[i + 1] = 0;
            pixels.data[i + 2] = 0;
            pixels.data[i + 3] = coverage;
            if (ink) {
              left = Math.min(left, x);
              right = Math.max(right, x);
              top = Math.min(top, y);
              bottom = Math.max(bottom, y);
            }
          }
        }
        if (right <= left || bottom <= top) throw new Error('Empty wordmark');
        context.putImageData(pixels, 0, 0);
        const mask = document.createElement('canvas');
        const fit = Math.min(
          600 / (right - left + 1),
          220 / (bottom - top + 1)
        );
        mask.width = Math.round((right - left + 1) * fit);
        mask.height = Math.round((bottom - top + 1) * fit);
        const maskContext = mask.getContext('2d');
        maskContext.drawImage(
          source,
          left,
          top,
          right - left + 1,
          bottom - top + 1,
          0,
          0,
          mask.width,
          mask.height
        );
        const data = maskContext.getImageData(0, 0, mask.width, mask.height)
          .data;
        const points = [];
        for (let x = 0; x < mask.width; x += 2) {
          for (let y = 0; y < mask.height; y += 2) {
            if (data[(y * mask.width + x) * 4 + 3] > 100)
              points.push([
                (x - mask.width / 2) / 2,
                (y - mask.height / 2) / 2,
              ]);
          }
        }
        if (!points.length) throw new Error('Empty particle mask');
        resolve({
          mask,
          points: Array.from(
            { length: PARTICLES },
            (_, i) => points[Math.floor((i * points.length) / PARTICLES)]
          ),
        });
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = reject;
    image.src = `/logos/${logo.file}`;
  });
}

const LogoMorph = () => {
  const canvasRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [displayLogos, setDisplayLogos] = useState(LOGOS);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    const logos = shuffleLogos(LOGOS);
    setDisplayLogos(logos);
    if (reducedMotion) return undefined;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return undefined;
    let disposed = false,
      frame,
      elapsed = 0,
      last = 0,
      visible = true;
    const pointer = { x: -1000, y: -1000 };
    const move = event => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const leave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    const observer =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          })
        : null;
    if (observer) observer.observe(canvas);

    Promise.all(logos.map(loadLogo))
      .then(logos => {
        if (disposed) return;
        setReady(true);
        const draw = now => {
          if (disposed) return;
          const delta = last ? Math.min(now - last, 50) : 0;
          last = now;
          if (visible && !document.hidden) {
            elapsed += delta;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            if (
              canvas.width !== Math.round(width * ratio) ||
              canvas.height !== Math.round(height * ratio)
            ) {
              canvas.width = Math.round(width * ratio);
              canvas.height = Math.round(height * ratio);
            }
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            context.clearRect(0, 0, width, height);
            const mobileGrid = window.matchMedia('(max-width: 600px)').matches;
            const cellWidth = width / (mobileGrid ? 2 : COLUMNS);
            const cellHeight = mobileGrid ? height / 2 : height;
            const round = Math.floor(elapsed / CYCLE);
            for (let slot = 0; slot < COLUMNS; slot++) {
              const from = logos[(round * COLUMNS + slot) % logos.length];
              const to =
                logos[((round + 1) * COLUMNS + slot) % logos.length];
              const progress = Math.max(
                0,
                Math.min(1, ((elapsed % CYCLE) - slot * MORPH) / MORPH)
              );
              const ease = progress * progress * (3 - 2 * progress);
              const burst = Math.sin(progress * Math.PI);
              const cx = mobileGrid
                ? cellWidth * (slot % 2 + 0.5)
                : cellWidth * (slot + 0.5);
              const cy = mobileGrid
                ? cellHeight * (Math.floor(slot / 2) + 0.5)
                : height / 2;
              const fit = Math.min(0.55, (cellWidth - 32) / 300);
              const current = progress < 0.5 ? from : to;
              const solidOpacity = Math.max(0, 1 - burst * 3);
              const pointerDistance = Math.sqrt(
                (pointer.x - cx) ** 2 + (pointer.y - cy) ** 2
              );
              const hover = Math.max(
                0,
                1 - pointerDistance / Math.max(cellWidth, cellHeight) / 0.7
              );
              const logoWidth = (current.mask.width * fit) / 2;
              const logoHeight = (current.mask.height * fit) / 2;
              const hoverScale = 1 + hover * 0.02;
              const hoverOffsetX = (pointer.x - cx) * hover * 0.02;
              const hoverOffsetY = (pointer.y - cy) * hover * 0.02;
              context.globalAlpha = solidOpacity;
              context.drawImage(
                current.mask,
                cx - (logoWidth * hoverScale) / 2 + hoverOffsetX,
                cy - (logoHeight * hoverScale) / 2 + hoverOffsetY,
                logoWidth * hoverScale,
                logoHeight * hoverScale
              );
              if (burst < 0.05 && hover > 0) {
                const particleSize = Math.max(1, fit * 1.8);
                context.globalCompositeOperation = 'destination-out';
                for (let i = 0; i < PARTICLES; i++) {
                  const point = current.points[i];
                  const pointX =
                    cx + point[0] * fit * hoverScale + hoverOffsetX;
                  const pointY =
                    cy + point[1] * fit * hoverScale + hoverOffsetY;
                  const dx = pointX - pointer.x;
                  const dy = pointY - pointer.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  const influence = Math.max(0, 1 - distance / 100) * hover;
                  if (influence <= 0) continue;
                  context.fillRect(
                    pointX - particleSize / 2,
                    pointY - particleSize / 2,
                    particleSize,
                    particleSize
                  );
                }
                context.globalCompositeOperation = 'source-over';
                context.fillStyle = '#000';
                for (let i = 0; i < PARTICLES; i++) {
                  const point = current.points[i];
                  const pointX =
                    cx + point[0] * fit * hoverScale + hoverOffsetX;
                  const pointY =
                    cy + point[1] * fit * hoverScale + hoverOffsetY;
                  const dx = pointX - pointer.x;
                  const dy = pointY - pointer.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  const influence = Math.max(0, 1 - distance / 100) * hover;
                  if (influence <= 0) continue;
                  const wave =
                    Math.sin(distance * 0.18 - elapsed * 0.012) *
                    28 *
                    influence;
                  const directionX = distance ? dx / distance : 0;
                  const directionY = distance ? dy / distance : 0;
                  context.globalAlpha = Math.min(1, influence * 2.5);
                  context.fillRect(
                    pointX + directionX * wave - particleSize / 2,
                    pointY + directionY * wave - particleSize / 2,
                    particleSize,
                    particleSize
                  );
                }
                context.globalAlpha = 1;
              }
              if (burst > 0) {
                context.globalAlpha = Math.min(1, burst * 3);
                for (let i = 0; i < PARTICLES; i++) {
                  const a = from.points[i],
                    b = to.points[i];
                  let x =
                    cx +
                    (a[0] +
                      (b[0] - a[0]) * ease +
                      Math.sin(i * 12.989) * 48 * burst) *
                      fit;
                  let y =
                    cy +
                    (a[1] +
                      (b[1] - a[1]) * ease +
                      Math.cos(i * 7.13) * 38 * burst) *
                      fit;
                  const dx = x - pointer.x,
                    dy = y - pointer.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  if (distance < 65 && distance > 0) {
                    const push = (1 - distance / 65) * 15 * burst;
                    x += (dx / distance) * push;
                    y += (dy / distance) * push;
                  }
                  context.fillStyle = '#000';
                  context.fillRect(
                    x,
                    y,
                    Math.max(0.8, fit * 1.35),
                    Math.max(0.8, fit * 1.35)
                  );
                }
              }
            }
            context.globalAlpha = 1;
          }
          frame = window.requestAnimationFrame(draw);
        };
        frame = window.requestAnimationFrame(draw);
      })
      .catch(() => {
          if (!disposed) setFailed(true);
      });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      if (observer) observer.disconnect();
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
    };
  }, [reducedMotion]);

  return (
    <Section
      $visible={mounted && (ready || reducedMotion || failed)}
      aria-labelledby="company-wordmarks-heading"
    >
 
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={displayLogos.map(logo => logo.name).join(', ')}
        style={{ display: ready && !reducedMotion ? 'block' : 'none' }}
      />
      {(!ready || reducedMotion) && (
        <Fallback>
          {displayLogos.map(logo => (
            <figure key={logo.name}>
              <img
                src={`/logos/${logo.file}`}
                alt={logo.name}
                style={{
                  filter: logo.light
                    ? 'invert(1) grayscale(1)'
                    : 'grayscale(1) contrast(10)',
                }}
              />
              <figcaption>{logo.name}</figcaption>
            </figure>
          ))}
        </Fallback>
      )}
    </Section>
  );
};

export default LogoMorph;
