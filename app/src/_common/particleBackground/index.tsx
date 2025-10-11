import { ReactNode, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // or loadFull if you want more features

type ParticlesBackgroundProps = {
  children: ReactNode;
};

const ParticlesBackground = ({ children }: ParticlesBackgroundProps) => {
  const [particlesReady, setParticlesReady] = useState(false);
  const [prefersReducedMotion] = useState(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {particlesReady && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            particles: {
              color: { value: "#ffffff" },
              links: {
                color: "#DD6031",
                distance: 185,
                enable: true,
                opacity: 1,
                width: 1,
              },
              collisions: { enable: true },
              move: {
                direction: "right",
                enable: true,
                outModes: { default: "split" },
                random: false,
                speed: prefersReducedMotion ? 0.2 : 2,
                straight: false,
              },
              number: {
                density: { enable: true },
                value: 80,
              },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default ParticlesBackground;
