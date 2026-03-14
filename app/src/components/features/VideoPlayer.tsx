import { cn } from "~/lib/cn";

interface VideoPlayerProps {
  className?: string;
  children?: React.ReactNode;
}

export function VideoPlayer({ className, children }: VideoPlayerProps) {
  return (
    <div className={cn("video-player", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Video Player</h3>
        {children}
      </div>
    </div>
  );
}
