"use client";

import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

type StoryBlockProps = {
  align?: "left" | "right" | "center";
  children: React.ReactNode;
};

function StoryBlock({
  align = "left",
  children,
}: StoryBlockProps) {
  const { ref, visible } = useReveal();

  const alignment = {
    left: "md:mr-auto md:text-left",
    right: "md:ml-auto md:text-right",
    center: "mx-auto text-center",
  };

  return (
    <div
      ref={ref}
      className={`
        w-full max-w-xl 
        transition-all duration-1000 ease-out
        ${alignment[align]}
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-12 opacity-0"
        }
      `}
    >
      {children}
    </div>
  );
}

export function OurStory() {
  return (
    <section
      className="
        relative min-h-screen
        bg-black
        text-white
      "
    >
      {/* Sticky background image */}
      <div
        className="
          sticky top-0
          h-screen
          bg-cover
          bg-center
          bg-fixed
        "
        style={{
          backgroundImage:
            "url('/story-brand.png')",
        }}
      >
        <div
          className="
            absolute inset-0
            bg-black/70
            bg-gradient-to-b
            from-black/60
            via-black/80
            to-black
          "
        />
      </div>

      {/* Content scrolls over image */}
      <div className="relative z-10 -mt-[100vh] space-y-96 px-6 py-32">
        {/* 1 */}
        <StoryBlock align="center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            Our Story
          </p>

          <h2 className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight md:text-6xl">
            Every scar tells a story.
          </h2>

          <p className="mt-4 text-xl text-white/80 md:text-2xl">
            Every round shapes who you become.
          </p>
        </StoryBlock>


        {/* 2 */}
        <StoryBlock align="left">
          <p className="text-lg leading-relaxed text-white/90 md:text-2xl">
            Built for those who choose{" "}
            <span className="font-semibold text-white">
              discipline over excuses
            </span>
            ,{" "}
            <span className="font-semibold text-white">
              consistency over comfort
            </span>
            , and{" "}
            <span className="font-semibold text-white">
              purpose over hype
            </span>
            .
          </p>

          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            Inspired by the relentless spirit of elite martial
            artists like Canada's own Simon Marcus, we create
            premium apparel that carries the same mindset from
            the gym to everyday life — not because everyone is a
            champion, but because everyone has something worth
            fighting for.
          </p>
        </StoryBlock>


        {/* 3 */}
        <StoryBlock align="right">
          <p className="text-lg leading-relaxed text-white/90 md:text-2xl">
            Hoodies, tees, and essentials designed with
            uncompromising quality, timeless style, and everyday
            comfort.
          </p>

          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            Whether you're walking into the gym before sunrise,
            recovering after a hard training session, or simply
            living with intention — Tatara moves with you.
          </p>
        </StoryBlock>


        {/* 4 */}
        <StoryBlock align="left">
          <p className="text-3xl font-bold uppercase leading-snug tracking-tight md:text-5xl">
            This isn't fast fashion.
            <br />
            This isn't just fightwear.
          </p>
        </StoryBlock>


        {/* 5 */}
        <StoryBlock align="right">
          <p className="text-lg leading-relaxed text-white/90 md:text-2xl">
            It's apparel for people who earn their confidence
            through hard work, respect the process, and never
            stop improving.
          </p>
        </StoryBlock>


        {/* 6 */}
        <StoryBlock align="center">
          <h2 className="text-5xl font-bold uppercase tracking-tight md:text-7xl">
            Tatara Apparel.
          </h2>

          <p className="mt-4 text-xl uppercase tracking-[0.3em] text-white/80 md:text-2xl">
            Wear the Mindset.
          </p>

          <a
            href="/shop"
            className="
              mt-10 inline-block
              border border-white/30
              px-8 py-4
              text-sm uppercase
              tracking-[0.25em]
              transition
              hover:bg-white
              hover:text-black
            "
          >
            Shop the Collection
          </a>
        </StoryBlock>
      </div>
    </section>
  );
}