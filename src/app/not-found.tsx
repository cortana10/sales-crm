import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="text-center max-w-md">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">404</h1>
        <p className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">Page not found</p>
        <p className="text-body-sm text-on-surface-variant mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/dashboard"
          className="inline-block rounded bg-primary-container text-on-primary px-4 py-2 text-label-md hover:opacity-90"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}