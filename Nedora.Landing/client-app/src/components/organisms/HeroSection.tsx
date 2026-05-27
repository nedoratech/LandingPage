"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Container } from "@/components/templates/LandingTemplate";
import { HERO_IMAGE, SECTION_IDS } from "@/lib/constants";
import { useLocale } from "@/providers/LocaleProvider";

export function HeroSection() {
  const { t } = useLocale();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleHeroImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section className="hero-scroll relative w-full" aria-label="Hero">
      <div className="hero-scroll__bg-layer" aria-hidden>
        <div className="hero-scroll__bg-sticky">
          <div
            className={`hero-scroll__media ${imageLoaded ? "hero-scroll__media--revealed" : ""}`}
          >
            <Image
              src={HERO_IMAGE.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              onLoad={handleHeroImageLoad}
              onLoadingComplete={handleHeroImageLoad}
            />
          </div>
          <div
            className={`hero-scroll__flash ${imageLoaded ? "hero-scroll__flash--done" : ""}`}
          />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/45 via-transparent to-black/25" />
        </div>
        <div className="hero-scroll__reveal" />
      </div>

      <div className="hero-scroll__foreground">
        <Container className="hero-scroll__content">
          <div
            className={`landing-card hero-scroll__panel mb-6 max-w-3xl rounded-2xl p-8 sm:mb-8 sm:p-10 lg:max-w-4xl lg:rounded-3xl lg:p-12 ${imageLoaded ? "hero-scroll__panel--revealed" : ""}`}
          >
            <Heading level={1} className="text-black">
              {t.hero.headline}
            </Heading>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-600">
              {t.hero.subhead}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={`#${SECTION_IDS.contact}`} variant="cta">
                {t.hero.primaryCta}
              </Button>
              <Button href={`#${SECTION_IDS.process}`} variant="heroPrimary">
                {t.hero.secondaryCta}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
