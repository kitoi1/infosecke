export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} InfoSecKe — Open Source Cybersecurity Platform.
      </div>
    </footer>
  );
}
