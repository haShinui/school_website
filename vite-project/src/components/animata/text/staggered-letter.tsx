import { HTMLAttributes } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface DropLetterProps extends HTMLAttributes<HTMLDivElement> {
  applyMask?: boolean;
  text?: string;
  delay?: number;
  initialDelay?: number; // Added for the initial delay
  direction?: "up" | "drop";
}

export default function StaggeredLetter({
  applyMask = false,
  text = "Animata",
  delay = 0.09,
  initialDelay = 0, // Default is no delay
  direction = "drop",
  className,
  ...props
}: DropLetterProps) {
  const common = "text-7xl font-bold drop-shadow-lg";
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-foreground",
        className,
      )}
      {...props}
    >
      {applyMask && <div className={cn(common, "absolute text-gray-400")}>{text}</div>}
      <div className="flex">
        {text.split("").map((letter, index) => (
          <motion.div
            key={`${letter}-${index}`}
            className={common}
            initial={{ opacity: 0, y: direction === "up" ? 150 : -150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: initialDelay + index * delay, // Added initial delay
            }}  
          >
            {letter === " " ? <span>&nbsp;</span> : letter}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
