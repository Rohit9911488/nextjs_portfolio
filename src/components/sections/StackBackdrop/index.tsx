import { forwardRef, type ReactNode } from "react";
import styles from "./StackBackdrop.module.css";

const StackBackdrop = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string; variant?: "stack" | "flush" }
>(function StackBackdrop({ children, className = "", variant = "flush" }, ref) {
  const variantClass = variant === "stack" ? styles.stack : styles.flush;

  return (
    <div ref={ref} className={`relative ${variantClass} ${className}`.trim()}>
      {children}
    </div>
  );
});

export default StackBackdrop;
