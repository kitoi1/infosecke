import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold">
          InfoSecKe
        </Link>

        <nav className="flex gap-6">
          <Link href="/cybersecurity">Cybersecurity</Link>
          <Link href="/ethical-hacking">Ethical Hacking</Link>
          <Link href="/linux">Linux</Link>
          <Link href="/labs">Labs</Link>
          <Link href="/research">Research</Link>
        </nav>
      </div>
    </header>
  );
}
