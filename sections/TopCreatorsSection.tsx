"use client";

import Link from "next/link";
import { useRef } from "react";
import { useTopCreatorsAnimations } from "@/animations/useTopCreatorsAnimations";
import { CreatorCard, type Creator } from "@/components/creators/CreatorCard";

const topCreators: Creator[] = [
  {
    id: "ava-wright",
    name: "Ava Wright",
    category: "Fashion Influencer",
    followers: "1.2M",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "noah-park",
    name: "Noah Park",
    category: "Cinematographer",
    followers: "480K",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "mia-chen",
    name: "Mia Chen",
    category: "Photographer",
    followers: "690K",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "leo-santos",
    name: "Leo Santos",
    category: "Video Editor",
    followers: "310K",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "isla-james",
    name: "Isla James",
    category: "Lifestyle Influencer",
    followers: "2.0M",
    image:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ethan-kim",
    name: "Ethan Kim",
    category: "Videographer",
    followers: "540K",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sofia-romero",
    name: "Sofia Romero",
    category: "Actor / Model",
    followers: "860K",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "aria-singh",
    name: "Aria Singh",
    category: "Beauty Creator",
    followers: "1.6M",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
  },
];

export function TopCreatorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useTopCreatorsAnimations(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white px-6 py-20 text-black md:px-12 md:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-24 bg-gradient-to-b from-black to-transparent" />

      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p
            data-creators-header
            className="text-xs tracking-[0.28em] uppercase text-zinc-600"
          >
            Top Creators
          </p>
          <h2
            data-creators-header
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black md:text-5xl"
          >
            Work with the Best Talent
          </h2>
          <p
            data-creators-header
            className="mt-4 text-base leading-relaxed text-zinc-600 md:text-lg"
          >
            Discover creators trusted by leading brands
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {topCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/creators"
            className="inline-flex items-center gap-2 text-sm tracking-[0.18em] uppercase text-black/80 hover:text-black"
          >
            View All Creators <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

