import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface ErrorProps {
  error?: Error & { digest?: string };
  reset: () => void;
  title?: string;
  message?: string;
}

const Error = ({
  error,
  reset,
  title = "Something went wrong!",
  message = "An unexpected error occurred. Please try again.",
}: ErrorProps) => {
  useEffect(() => {
    if (error) {
      // Log the error to an error reporting service
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <XCircle className="h-10 w-10 text-destructive" />
        <h2 className="text-2xl font-bold tracking-tight">
          {error?.name || title}
        </h2>
        <p className="text-muted-foreground">{error?.message || message}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => window.history.back()}>Go Back</Button>
        <Button onClick={reset} variant="outline">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default Error;
