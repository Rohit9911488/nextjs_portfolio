import Image from "next/image";
import styles from "./ImageFrame.module.css";

type ImageFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export default function ImageFrame({
  src,
  alt,
  priority = false,
  className,
}: ImageFrameProps) {
  return (
    <div className={`${styles.frame}${className ? ` ${className}` : ""}`}>
      <Image
        src={src}
        alt={alt}
        width={464}
        height={652}
        priority={priority}
        sizes="(max-width: 1280px) 100vw, 1224px"
        className={styles.image}
      />
    </div>
  );
}
