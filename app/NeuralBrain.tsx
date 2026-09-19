"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  phase: number;
};

type Connection = [number, number];

function seededRandom(seed: number) {
  const value = Math.sin(seed * 999.91) * 43758.5453;
  return value - Math.floor(value);
}

function createPoints(width: number, height: number) {
  const points: Point[] = [];

  for (let index = 0; index < 54; index += 1) {
    const angle = seededRandom(index + 1) * Math.PI * 2;
    const radius = Math.sqrt(seededRandom(index + 91));
    const x = width * (0.51 + Math.cos(angle) * radius * 0.35);
    const y = height * (0.5 + Math.sin(angle) * radius * 0.255);

    if (x < width * 0.22 && y > height * 0.58) continue;
    if (x > width * 0.78 && y > height * 0.69) continue;

    points.push({
      x,
      y,
      phase: seededRandom(index + 211) * Math.PI * 2,
    });
  }

  return points;
}

export default function NeuralBrain() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer = { x: 0, y: 0, active: false };
    let points: Point[] = [];
    let connections: Connection[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let isVisible = true;
    let lastFrame = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const scheduleDraw = () => {
      if (!isVisible || animationFrame) return;
      animationFrame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const bounds = stage.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, coarsePointer ? 1 : 1.5);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = createPoints(width, height);
      connections = [];

      for (let first = 0; first < points.length; first += 1) {
        for (let second = first + 1; second < points.length; second += 1) {
          const a = points[first];
          const b = points[second];
          if (Math.hypot(a.x - b.x, a.y - b.y) <= width * 0.13) {
            connections.push([first, second]);
          }
        }
      }
      scheduleDraw();
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = stage.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
      stage.dataset.engaged = "true";
      scheduleDraw();
    };

    const clearPointer = () => {
      pointer.active = false;
      delete stage.dataset.engaged;
      scheduleDraw();
    };

    const draw = (time: number) => {
      animationFrame = 0;
      if (!isVisible) return;
      if (pointer.active && !reducedMotion && time - lastFrame < 32) {
        scheduleDraw();
        return;
      }
      lastFrame = time;
      context.clearRect(0, 0, width, height);
      const focusX = pointer.active
        ? pointer.x
        : width * 0.51;
      const focusY = pointer.active
        ? pointer.y
        : height * 0.49;
      const reach = pointer.active ? Math.min(width, height) * 0.235 : 94;

      connections.forEach(([first, second]) => {
          const a = points[first];
          const b = points[second];
          const midpointX = (a.x + b.x) / 2;
          const midpointY = (a.y + b.y) / 2;
          const focusDistance = Math.hypot(
            midpointX - focusX,
            midpointY - focusY,
          );
          const strength = Math.max(0, 1 - focusDistance / reach);
          if (strength <= 0) return;

          const shimmer =
            reducedMotion || !pointer.active
              ? 0.72
              : 0.68 + Math.sin(time * 0.012 + a.phase) * 0.32;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(242, 81, 59, ${strength * shimmer * 0.72})`;
          context.lineWidth = 0.7 + strength * 1.8;
          context.shadowColor = "rgba(255, 103, 79, .9)";
          context.shadowBlur = strength * 8;
          context.stroke();
      });

      points.forEach((point) => {
        const distance = Math.hypot(point.x - focusX, point.y - focusY);
        const strength = Math.max(0, 1 - distance / reach);
        if (strength <= 0) return;

        const pulse =
          reducedMotion
            ? 0.75
            : 0.62 + Math.sin(time * 0.009 + point.phase) * 0.38;
        const radius = 1.4 + strength * (2.7 + pulse * 2);

        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, ${104 + pulse * 45}, 105, ${0.55 + strength * 0.45})`;
        context.shadowColor = "rgba(255, 87, 63, 1)";
        context.shadowBlur = 5 + strength * 12;
        context.fill();
      });

      context.shadowBlur = 0;
      if (pointer.active) {
        const halo = context.createRadialGradient(
          focusX,
          focusY,
          0,
          focusX,
          focusY,
          reach * 0.72,
        );
        halo.addColorStop(0, "rgba(255, 105, 78, .13)");
        halo.addColorStop(1, "rgba(255, 105, 78, 0)");
        context.fillStyle = halo;
        context.fillRect(
          focusX - reach,
          focusY - reach,
          reach * 2,
          reach * 2,
        );
      }

      if (pointer.active && !reducedMotion && !coarsePointer) {
        scheduleDraw();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) scheduleDraw();
        else if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = 0;
        }
      },
      { rootMargin: "80px" },
    );
    resizeObserver.observe(stage);
    visibilityObserver.observe(stage);
    // Keep the brain calm on touch-first devices: it remains visible, but the
    // pointer-driven animation is reserved for precise desktop input.
    if (!coarsePointer) {
      stage.addEventListener("pointermove", updatePointer);
      stage.addEventListener("pointerleave", clearPointer);
    }
    resize();
    scheduleDraw();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (!coarsePointer) {
        stage.removeEventListener("pointermove", updatePointer);
        stage.removeEventListener("pointerleave", clearPointer);
      }
    };
  }, []);

  return (
    <div
      className="cover-brain"
      ref={stageRef}
      role="img"
      aria-label="A translucent brain with neural connections that illuminate around the pointer"
    >
      <div className="brain-image" aria-hidden="true" />
      <canvas className="brain-neurons" ref={canvasRef} aria-hidden="true" />
      <span className="brain-hint" aria-hidden="true">
        Move or tap to explore
      </span>
    </div>
  );
}
