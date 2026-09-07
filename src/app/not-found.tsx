import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100dvh] place-items-center px-6 text-center">
      <div>
        <h1 className="font-display text-4xl text-ink">Page not found</h1>
        <Link href="/" className="mt-6 inline-block text-sm tracking-wide text-teal">
          Back to Kavya Reddy
        </Link>
      </div>
    </main>
  );
}
