// TypingText.tsx

import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingTextProps {
  text: string;
  delay?: number;
  repeat?: boolean;
  cursor?: ReactNode | boolean;
  className?: string;
  grow?: boolean;
  initialDelay?: number;
  waitTime?: number;
  onComplete?: () => void;
  hideCursorOnComplete?: boolean;
}

function Blinker() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <span className={visible ? "" : "opacity-0"}>|</span>;
}

export default function TypingText({
  text,
  delay = 50,
  repeat = false,
  cursor = true,
  className,
  grow = false,
  initialDelay = 0,
  waitTime = 1000,
  onComplete,
  hideCursorOnComplete = false,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTyping = () => {
      setTypingStarted(true);
    };

    const timer = setTimeout(startTyping, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  useEffect(() => {
    if (!typingStarted) return;

    if (isComplete && !repeat) return;

    let typingInterval: NodeJS.Timeout;

    if (!isDeleting) {
      if (index < text.length) {
        typingInterval = setTimeout(() => {
          setDisplayedText((prev) => prev + text.charAt(index));
          setIndex((prev) => prev + 1);
        }, delay);
      } else {
        if (repeat) {
          setTimeout(() => {
            setIsDeleting(true);
          }, waitTime);
        } else {
          setIsComplete(true);
          onComplete && onComplete();
        }
      }
    } else {
      if (index > 0) {
        typingInterval = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, delay);
      } else {
        setIsDeleting(false);
      }
    }

    return () => clearTimeout(typingInterval);
  }, [
    index,
    isDeleting,
    typingStarted,
    delay,
    text,
    repeat,
    waitTime,
    onComplete,
    isComplete,
  ]);

  return (
    <span className={cn("relative", className)} style={{ display: "inline-block" }}>
      {!grow && <span className="invisible">{text}</span>}
      <span
        className={cn({ "absolute inset-0 h-full w-full": !grow })}
        style={{ display: "inline-block" }}
      >
        {displayedText}
        {cursor && (!isComplete || !hideCursorOnComplete) && (
          <span className="ml-1">{cursor === true ? <Blinker /> : cursor}</span>
        )}
      </span>
    </span>
  );
}
