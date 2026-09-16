import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-bold text-2xl md:text-3xl">404 — Seite nicht gefunden</h1>
      <p className="text-sm text-black/60 max-w-sm">
        Diese Seite gibt es nicht (mehr). Vielleicht wurde das Projekt umbenannt oder verschoben.
      </p>
      <Link
        href="/"
        className="rounded-pill bg-black text-white font-bold px-6 py-3 hover:opacity-85 transition-opacity"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
