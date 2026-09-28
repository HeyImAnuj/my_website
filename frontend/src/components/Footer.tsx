interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {name}</p>
        <p>Software Development Engineer 2</p>
      </div>
    </footer>
  );
}
