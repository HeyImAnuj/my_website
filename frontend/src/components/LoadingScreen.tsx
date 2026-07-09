import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-dark)]">
      <Loader2 size={48} className="animate-spin text-[var(--color-primary)] mb-4" />
      <p className="text-[var(--color-text-muted)]">Loading portfolio...</p>
    </div>
  );
}

export function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-dark)] px-6">
      <div className="text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-[var(--color-text-muted)] text-center max-w-md mb-6">{message}</p>
      <p className="text-sm text-[var(--color-text-muted)]">
        Make sure the backend is running on port 5000 and PostgreSQL is up.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
      >
        Retry
      </button>
    </div>
  );
}
