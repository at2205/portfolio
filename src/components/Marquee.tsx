export function Marquee({ words }: { words: string[] }) {
  // four copies: the track slides by exactly half (two copies) and loops seamlessly
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
