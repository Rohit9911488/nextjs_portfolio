import Image from "next/image";
import { hasProjectImage } from "@/lib/project-image";

type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
} & (
  | { fill: true; width?: never; height?: never }
  | { fill?: false; width: number; height: number }
);

export default function ProjectImage({
  src,
  alt,
  className,
  sizes,
  priority,
  ...layout
}: ProjectImageProps) {
  if (!hasProjectImage(src)) {
    return null;
  }

  if (layout.fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes ?? "100vw"}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={layout.width}
      height={layout.height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
