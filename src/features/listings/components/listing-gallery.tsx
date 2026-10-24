"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ListingGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const gallery = images.length > 0 ? images : [];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (gallery.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[1.25rem] bg-[var(--surface-subtle)] text-sm text-[var(--text-body)]">
        No photos available
      </div>
    );
  }

  const current = gallery[Math.min(active, gallery.length - 1)]!;

  function prev() {
    setActive((i) => (i - 1 + gallery.length) % gallery.length);
  }
  function next() {
    setActive((i) => (i + 1) % gallery.length);
  }

  return (
    <>
      <section aria-label="Photo gallery" className="space-y-3">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-[var(--surface-subtle)] shadow-[0_28px_70px_-42px_rgba(8,24,39,0.55)]">
          <Image
            src={current}
            alt={`Illustrative photo for ${title}`}
            fill
            className="object-cover transition duration-500"
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081827]/70 via-transparent to-transparent" />
          <p className="absolute bottom-4 left-4 max-w-[70%] text-left text-sm leading-snug !text-white/90">
            Illustrative stock · not a real for-sale property
          </p>
          <div className="absolute bottom-4 right-4 flex gap-2">
            {gallery.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#081827]/65 !text-white backdrop-blur hover:bg-[#081827]/85"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#081827]/65 !text-white backdrop-blur hover:bg-[#081827]/85"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-[#081827]/65 px-3 text-sm font-semibold !text-white backdrop-blur hover:bg-[#081827]/85"
            >
              <Expand className="h-4 w-4" aria-hidden />
              Expand
            </button>
          </div>
          <span className="absolute left-4 top-4 rounded-full bg-[#081827]/65 px-2.5 py-1 text-xs font-semibold !text-white backdrop-blur">
            {active + 1} / {gallery.length}
          </span>
        </div>

        {gallery.length > 1 ? (
          <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:gap-3">
            {gallery.map((src, index) => (
              <li key={`${src}-${index}`}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-2 transition",
                    index === active
                      ? "ring-[#1E6EF4]"
                      : "ring-transparent hover:ring-[var(--border-subtle)]",
                  )}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={index === active}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#081827]/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close gallery"
            onClick={() => setLightbox(false)}
          />
          <div className="relative z-10 w-full max-w-5xl">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={current}
                alt=""
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prev}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 font-semibold !text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <button
                type="button"
                onClick={() => setLightbox(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 !text-white hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 font-semibold !text-white hover:bg-white/20"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
