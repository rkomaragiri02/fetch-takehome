import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
}

const Loader = ({
  size = "md",
  variant = "default",
  className,
  ...props
}: LoaderProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("animate-spin", className)}
      {...props}
    >
      <div
        className={cn(
          "rounded-full border-current border-t-transparent",
          {
            "h-4 w-4 border-2": size === "sm",
            "h-6 w-6 border-2": size === "md",
            "border-3 h-8 w-8": size === "lg",
          },
          {
            "text-muted-foreground": variant === "default",
            "text-primary": variant === "primary",
            "text-secondary": variant === "secondary",
          },
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
