// useMousePosition.ts

import { useEffect } from "react";

export function useMousePosition(
  ref: React.RefObject<HTMLElement>,
  callback: ({ x, y }: { x: number; y: number }) => void
) {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = event;
      callback({ x: clientX, y: clientY });
    };

    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref, callback]);
}
