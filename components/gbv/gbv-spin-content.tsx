"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export function GbvSpinContent() {
  const [mounted, setMounted] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [speed, setSpeed] = useState<"33" | "45" | "78">("33");
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const frameCount = 12;

  useEffect(() => {
    setMounted(true);
  }, []);

  // RPM to degrees per millisecond
  const getDegreesPerMs = () => {
    switch (speed) {
      case "33": return (33.33 * 360) / 60000;
      case "45": return (45 * 360) / 60000;
      case "78": return (78 * 360) / 60000;
    }
  };

  useEffect(() => {
    if (!isSpinning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const degreesPerMs = getDegreesPerMs();

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setRotation((prev) => (prev + delta * degreesPerMs) % 360);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimeRef.current = 0;
    };
  }, [isSpinning, speed]);

  // Walking figure component with animation frame and dynamic color
  const WalkingFigure = ({ frame, hue }: { frame: number; hue: number }) => {
    const walkCycle = frame % 4;
    const color = `hsl(${hue}, 80%, 65%)`;
    return (
      <svg width="20" height="30" viewBox="0 0 24 36" className="sm:w-6 sm:h-9 md:w-8 md:h-12">
        {/* Head */}
        <circle cx="12" cy="4" r="4" fill={color} />
        {/* Body */}
        <line x1="12" y1="8" x2="12" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* Arms */}
        <line x1="12" y1="12" x2={walkCycle < 2 ? "5" : "19"} y2={walkCycle % 2 === 0 ? "18" : "14"} stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="12" x2={walkCycle < 2 ? "19" : "5"} y2={walkCycle % 2 === 0 ? "14" : "18"} stroke={color} strokeWidth="2" strokeLinecap="round" />
        {/* Legs */}
        {walkCycle === 0 && (
          <>
            <line x1="12" y1="20" x2="4" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="20" x2="20" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {walkCycle === 1 && (
          <>
            <line x1="12" y1="20" x2="8" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="20" x2="16" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {walkCycle === 2 && (
          <>
            <line x1="12" y1="20" x2="20" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="20" x2="4" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {walkCycle === 3 && (
          <>
            <line x1="12" y1="20" x2="16" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="20" x2="8" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        )}
      </svg>
    );
  };

  // Generate figures for each ring
  const rings = [
    { radius: 46, scale: 0.65 },
    { radius: 38, scale: 0.7 },
    { radius: 30, scale: 0.75 },
  ];

  return (
    <div className="container py-6">
      <h1 className="font-league text-2xl font-semibold mb-6">Spin</h1>

      <div className="flex flex-col items-center gap-8">
        {/* Vinyl Record with Zoetrope */}
        <div className="relative">
          {/* Record */}
          <div
            className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl overflow-hidden"
            style={{ transform: mounted ? `rotate(${rotation}deg)` : 'rotate(0deg)' }}
          >
            {/* Grooves */}
            <div className="absolute inset-4 rounded-full border border-zinc-700/30" />
            <div className="absolute inset-8 rounded-full border border-zinc-700/20" />
            <div className="absolute inset-12 rounded-full border border-zinc-700/30" />
            <div className="absolute inset-16 rounded-full border border-zinc-700/20" />
            <div className="absolute inset-20 rounded-full border border-zinc-700/30" />
            <div className="absolute inset-24 rounded-full border border-zinc-700/20" />

            {/* Zoetrope figures with motion trail effect */}
            {rings.map((ring, ringIndex) =>
              Array.from({ length: frameCount }, (_, i) => {
                const angle = (i / frameCount) * 360;
                const angleRad = (angle * Math.PI) / 180;
                const x = Math.round((50 + ring.radius * Math.sin(angleRad)) * 100) / 100;
                const y = Math.round((50 - ring.radius * Math.cos(angleRad)) * 100) / 100;
                // Animation frame changes based on rotation - slower than vinyl spin for mesmerizing effect
                const rotationCycles = Math.floor(rotation / 90); // Change frame every 90 degrees (slower animation)
                const animFrame = (i + ringIndex * 3 + rotationCycles) % frameCount;

                // Create trail/ghost copies for overlap illusion
                const trailCount = 4;
                const trailSpacing = 360 / frameCount / (trailCount + 1);
                const trailOpacities = [0.6, 0.45, 0.3, 0.15];

                // Calculate hue based on position and rotation for color mixing
                const baseHue = (angle + ringIndex * 60) % 360;
                const animatedHue = Math.round((baseHue + rotation * 2) % 360);

                return (
                  <div key={`${ringIndex}-${i}`}>
                    {/* Trail copies (ghosts) */}
                    {Array.from({ length: trailCount }, (_, t) => {
                      const trailAngle = Math.round((angle - (t + 1) * trailSpacing) * 100) / 100;
                      const trailAngleRad = (trailAngle * Math.PI) / 180;
                      const trailX = Math.round((50 + ring.radius * Math.sin(trailAngleRad)) * 100) / 100;
                      const trailY = Math.round((50 - ring.radius * Math.cos(trailAngleRad)) * 100) / 100;
                      const trailFrame = (animFrame - t - 1 + frameCount) % frameCount;
                      const trailHue = Math.round((animatedHue - (t + 1) * 15) % 360);
                      return (
                        <div
                          key={`trail-${t}`}
                          className="absolute"
                          style={{
                            left: `${trailX}%`,
                            top: `${trailY}%`,
                            transform: `translate(-50%, -50%) rotate(${trailAngle}deg) scale(${ring.scale})`,
                            opacity: mounted && isSpinning ? trailOpacities[t] : 0,
                          }}
                        >
                          <WalkingFigure frame={trailFrame} hue={trailHue} />
                        </div>
                      );
                    })}
                    {/* Main figure */}
                    <div
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${ring.scale})`,
                      }}
                    >
                      <WalkingFigure frame={animFrame} hue={animatedHue} />
                    </div>
                  </div>
                );
              })
            )}

            {/* Label */}
            <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-red-700 via-red-600 to-red-800 flex items-center justify-center z-10">
              <div
                className="text-center"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="text-white font-bold text-xs sm:text-sm md:text-base">
                  GBV
                </div>
                <div className="text-white/70 text-[8px] sm:text-[10px] md:text-xs">
                  {speed} RPM
                </div>
              </div>
            </div>

            {/* Center Hole */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-zinc-950 z-20" />
          </div>

          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-40" />
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsSpinning(!isSpinning)}
            className="gap-2"
          >
            {isSpinning ? (
              <>
                <Pause className="h-4 w-4" /> Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Play
              </>
            )}
          </Button>

          <div className="flex gap-2">
            <Button
              variant={speed === "33" ? "default" : "outline"}
              size="sm"
              onClick={() => setSpeed("33")}
            >
              33 RPM
            </Button>
            <Button
              variant={speed === "45" ? "default" : "outline"}
              size="sm"
              onClick={() => setSpeed("45")}
            >
              45 RPM
            </Button>
            <Button
              variant={speed === "78" ? "default" : "outline"}
              size="sm"
              onClick={() => setSpeed("78")}
            >
              78 RPM
            </Button>
          </div>

          <p className="text-sm text-muted-foreground text-center max-w-md">
            A zoetrope creates the illusion of motion by showing sequential animation frames through narrow slits as the disc spins.
          </p>
        </div>
      </div>
    </div>
  );
}
