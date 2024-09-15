// SkewCard.tsx

import { useCallback, useRef } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { cn } from "@/lib/utils";

function calculateCardRotation({
  currentX,
  currentY,
  centerX,
  centerY,
  maxRotationX,
  maxRotationY,
}: {
  currentX: number;
  currentY: number;
  centerX: number;
  centerY: number;
  maxRotationX: number;
  maxRotationY: number;
}) {
  // Calculate the distance from the center
  const deltaX = currentX - centerX;
  const deltaY = currentY - centerY;

  // Calculate rotations (inverted for natural tilt effect)
  const rotationY = ((deltaX / centerX) * maxRotationY).toFixed(2);
  const rotationX = ((-deltaY / centerY) * maxRotationX).toFixed(2);
  return { rotationX, rotationY };
}

export default function SkewCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<NodeJS.Timeout>();

  const update = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const { rotationX, rotationY } = calculateCardRotation({
        centerX: width / 2,
        centerY: height / 2,
        currentX: x - left,
        currentY: y - top,
        maxRotationX: 4,
        maxRotationY: 6,
      });
      containerRef.current.style.setProperty("--x", `${rotationX}deg`);
      containerRef.current.style.setProperty("--y", `${rotationY}deg`);
    },
    []
  );

  useMousePosition(containerRef, update);

  return (
    <div
      ref={containerRef}
      className={cn(
        "transform-gpu transition-transform ease-linear will-change-transform",
        className
      )}
      style={{
        transform: "perspective(400px) rotateX(var(--x)) rotateY(var(--y))",
        transitionDuration: "50ms",
      }}
      onMouseEnter={() => {
        resetRef.current = setTimeout(() => {
          if (!containerRef.current) {
            return;
          }
          // Reset the transition duration to 0 so that the mouse movement is smooth
          containerRef.current.style.transitionDuration = "0ms";
        }, 300);
      }}
      onMouseLeave={() => {
        clearTimeout(resetRef.current);
        if (!containerRef.current) {
          return;
        }
        containerRef.current.style.transitionDuration = "50ms";
        containerRef.current.style.setProperty("--x", "0deg");
        containerRef.current.style.setProperty("--y", "0deg");
      }}
    >
      {children}
    </div>
  );
}
