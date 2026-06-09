"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="text-center max-w-md">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Something went wrong</h1>
        <p className="text-body-sm text-on-surface-variant mb-6">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="rounded bg-primary-container text-on-primary px-4 py-2 text-label-md hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}