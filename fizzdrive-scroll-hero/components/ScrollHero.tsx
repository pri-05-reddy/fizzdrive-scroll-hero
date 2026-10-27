"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: "58%", description: "Increase in pick up point use" },
  { value: "23%", description: "Decreased in customer phone calls" },
  { value: "27%", description: "Increase in pick up point use" },
  { value: "40%", description: "Decreased in customer phone calls" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const managedCarImage =
  "/manus-storage/async-images/Stj0n9YSkveEmIOHuktqAE/image-1.webp";
const fallbackCarImage = `${basePath}/car-fallback.svg`;
const initialCarImage =
  process.env.NEXT_PUBLIC_USE_MANAGED_CAR === "1"
    ? managedCarImage
    : fallbackCarImage;

export default function ScrollHero() {
  const heroRef = useRef<HTMLElement>(null);
  const carMotionRef = useRef<HTMLDivElement>(null);
  const carImageRef = useRef<HTMLImageElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [carImage, setCarImage] = useState(initialCarImage);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    const motionLayer = carMotionRef.current;
    const carImageElement = carImageRef.current;
    const progress = progressRef.current;

    if (!hero || !motionLayer || !carImageElement || !progress) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-intro], [data-letter], .metric", {
        clearProps: "all",
        autoAlpha: 1,
        y: 0,
      });
      gsap.set(motionLayer, { xPercent: -50, y: 0, scale: 1, rotation: 0 });
      gsap.set(progress, { scaleX: 1 });
    });

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .fromTo(
          "[data-eyebrow]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          0,
        )
        .fromTo(
          "[data-letter]",
          { autoAlpha: 0, yPercent: 115, rotateX: -24 },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.035,
          },
          0.08,
        )
        .fromTo(
          ".metric",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.1 },
          0.42,
        )
        .fromTo(
          carImageElement,
          { autoAlpha: 0, y: 34, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 1.05 },
          0.22,
        );

      const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
      const travelX = isSmallScreen ? -57 : -67;
      const travelY = isSmallScreen ? -6 : -11;
      const tilt = isSmallScreen ? -2 : -4;

      gsap.set(motionLayer, { xPercent: -50 });

      gsap.to(motionLayer, {
        xPercent: travelX,
        yPercent: travelY,
        scale: isSmallScreen ? 0.94 : 0.88,
        rotation: tilt,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 1.7)}`,
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progress.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
    }, hero);

    return () => media.revert();
  }, []);

  const headline = Array.from("WELCOME ITZ FIZZ");

  return (
    <>
      <main className="min-h-screen bg-ink">
        <section
          ref={heroRef}
          className="hero"
          aria-labelledby="hero-title"
        >
          <header className="site-header">
            <a className="wordmark" href="#top" aria-label="FizzDrive home">
              <span className="wordmark-mark" aria-hidden="true">F</span>
              <span>FIZZDRIVE</span>
            </a>
            <span className="header-note">A little more fizz in every mile.</span>
            <a className="header-link" href="#story">
              THE FEELING <span aria-hidden="true">↗</span>
            </a>
          </header>

          <div className="hero-copy" id="top">
            <p className="eyebrow" data-eyebrow>
              <span className="eyebrow-dot" aria-hidden="true" />
              GOOD THINGS ARE IN MOTION
            </p>
            <h1 id="hero-title" className="hero-title" aria-label="WELCOME ITZ FIZZ">
              <span className="headline-visual" aria-hidden="true">
                {headline.map((letter, index) => (
                  <span
                    className={`letter ${letter === " " ? "letter-space" : ""}`}
                    data-letter
                    key={`${letter}-${index}`}
                  >
                    {letter === " " ? "\u00a0" : letter}
                  </span>
                ))}
              </span>
            </h1>
            <p className="hero-subtitle">
              Less waiting. More living. <span>That&apos;s the Fizz way.</span>
            </p>
          </div>

          <div className="metric-row" aria-label="Impact statistics">
            {metrics.map((metric, index) => (
              <article className="metric" key={`${metric.value}-${index}`}>
                <p className="metric-value">{metric.value}</p>
                <p className="metric-description">{metric.description}</p>
              </article>
            ))}
          </div>

          <div className="car-stage" aria-hidden="true">
            <div className="stage-glow" />
            <div className="road-line" />
            <div className="car-motion" ref={carMotionRef}>
              <Image
                ref={carImageRef}
                className="hero-car-image"
                src={carImage}
                alt=""
                width={1200}
                height={720}
                priority
                unoptimized
                draggable={false}
                onError={() => {
                  if (carImage !== fallbackCarImage) {
                    setCarImage(fallbackCarImage);
                  }
                }}
              />
            </div>
          </div>

          <div className="hero-footer">
            <span className="footer-caption">PICKUP, REIMAGINED.</span>
            <a className="scroll-cue" href="#story">
              <span>SCROLL TO FEEL IT</span>
              <span className="scroll-arrow" aria-hidden="true">↓</span>
            </a>
            <span className="footer-index">01 / 03</span>
          </div>

          <div className="scroll-progress" aria-hidden="true">
            <span ref={progressRef} />
          </div>
        </section>

        <section className="story-section" id="story" aria-labelledby="story-title">
          <div className="story-index">THE FIZZ DIFFERENCE <span>— 01</span></div>
          <div className="story-content">
            <p className="story-kicker">TIME IS YOURS AGAIN</p>
            <h2 id="story-title">
              Pick up the good stuff.
              <br />
              <span>Leave the wait behind.</span>
            </h2>
            <p className="story-description">
              More pickup points put life closer to you. Fewer calls, fewer detours,
              and a little more room in the day for the things you actually love.
            </p>
            <a className="story-link" href="#top">
              BACK TO THE TOP <span aria-hidden="true">↑</span>
            </a>
          </div>
          <div className="story-stamp" aria-hidden="true">FIZZ<br />&amp; GO</div>
        </section>

        <footer className="site-footer">
          <a className="wordmark footer-wordmark" href="#top">
            <span className="wordmark-mark" aria-hidden="true">F</span>
            <span>FIZZDRIVE</span>
          </a>
          <span>MADE FOR THE MOMENT.</span>
          <span>© 2026 FIZZDRIVE</span>
        </footer>
      </main>
    </>
  );
}
