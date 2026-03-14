import { cn } from "~/lib/cn";

interface AudioPlayerProps {
  className?: string;
  children?: React.ReactNode;
}

export function AudioPlayer({ className, children }: AudioPlayerProps) {
  return (
    <div className={cn("audio-player", className)}>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Audio Player</h3>
        {children}
      </div>
    </div>
  );
}
