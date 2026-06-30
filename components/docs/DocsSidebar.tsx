import Link from "next/link";
import { readdirSync } from "fs";
import path from "path";

export function DocsSidebar() {
  const docsDir = path.join(process.cwd(), "content/docs");
  const files = readdirSync(docsDir).filter(f => f.endsWith(".mdx"));
  
  return (
    <nav className="space-y-1">
      {files.map(file => {
        const slug = file.replace(/\.mdx$/, "");
        const href = slug === "index" ? "/docs" : `/docs/${slug}`;
        return (
          <Link
            key={file}
            href={href}
            className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
          >
            {slug === "index" ? "Overview" : slug.charAt(0).toUpperCase() + slug.slice(1)}
          </Link>
        );
      })}
    </nav>
  );
}
