// GibberishText.tsx

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface GibberishTextProps {
  text: string;
  className?: string;
  initialDelay?: number;
  duration?: number;
  intervalTime?: number;
  staggerDelay?: number;
  onComplete?: () => void;
}

interface LetterProps {
  letter: string;
  className?: string;
  initialDelay: number;
  duration: number;
  intervalTime: number;
  onLetterComplete: () => void;
}

const Letter = ({
  letter,
  className,
  initialDelay,
  duration,
  intervalTime,
  onLetterComplete,
}: LetterProps) => {
  const [code, setCode] = useState<string>(() => {
    // Start with a random uppercase letter
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const timer = setTimeout(() => {
      const totalIterations = Math.ceil(duration / intervalTime);
      let count = 0;
      const interval = setInterval(() => {
        if (count < totalIterations) {
          setCode(String.fromCharCode(Math.floor(Math.random() * 26) + 65));
          count++;
        } else {
          setCode(letter); // Transition to the correct letter
          clearInterval(interval);
          onLetterComplete(); // Notify that this letter is complete
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(timer);
    // Empty dependency array ensures this effect runs only once
  }, []);

  return (
    <span className={cn("whitespace-pre text-foreground", className)}>
      {code}
    </span>
  );
};

/**
 * Animate each letter in the text using a gibberish text effect.
 */
export default function GibberishText({
  text,
  className,
  initialDelay = 0,
  duration = 1000,
  intervalTime = 100,
  staggerDelay = 0,
  onComplete,
}: GibberishTextProps) {
  const [completedLetters, setCompletedLetters] = useState(0);
  const totalLetters = text.length;

  const handleLetterComplete = () => {
    setCompletedLetters((prev) => prev + 1);
  };

  useEffect(() => {
    if (completedLetters === totalLetters) {
      onComplete && onComplete();
    }
    // Empty dependency array to prevent re-running
  }, [completedLetters]);

  return (
    <>
      {text.split("").map((letter, index) => {
        // Calculate delay per letter for staggering
        const letterDelay = initialDelay + index * staggerDelay;
        return (
          <Letter
            className={className}
            letter={letter}
            key={`${index}-${letter}-${index}`}
            initialDelay={letterDelay}
            duration={duration}
            intervalTime={intervalTime}
            onLetterComplete={handleLetterComplete}
          />
        );
      })}
    </>
  );
}
