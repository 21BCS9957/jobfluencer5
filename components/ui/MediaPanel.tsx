type MediaPanelProps = {
  imageUrl: string;
  alt: string;
  eyebrow: string;
};

export function MediaPanel({ imageUrl, alt, eyebrow }: MediaPanelProps) {
  return (
    <div className="relative isolate h-[360px] w-full overflow-hidden rounded-3xl border border-white/15 bg-zinc-900 md:h-[430px]">
      <div
        data-media-layer
        className="absolute inset-0 bg-cover bg-center brightness-[0.72] contrast-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="img"
        aria-label={alt}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[0.62rem] tracking-[0.22em] uppercase text-white/90 backdrop-blur-sm">
        {eyebrow}
      </div>
    </div>
  );
}
