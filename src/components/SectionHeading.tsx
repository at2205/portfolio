import { Reveal } from "./animations";

type Props = {
  index: string;
  title: string;
  subtitle?: string;
};

export function SectionHeading({ index, title, subtitle }: Props) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-glow">
        <span>{index}</span>
        <span className="h-px w-10 bg-accent/40" />
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-white/55">{subtitle}</p>
      )}
    </Reveal>
  );
}
