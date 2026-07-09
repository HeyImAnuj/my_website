import { Heart } from 'lucide-react';

interface FooterProps {
  name: string;
}

export function Footer({ name }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[var(--color-text-muted)] text-sm flex items-center justify-center gap-1">
          © {year} {name}. Built with
          <Heart size={14} className="text-red-400 inline" />
          using React, Node.js & PostgreSQL
        </p>
      </div>
    </footer>
  );
}
