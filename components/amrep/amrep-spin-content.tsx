"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { getMusicSiteFromPathname } from "@/lib/music-site";

export function GbvSpinContent() {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
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

  // Walking figure component with animation frame and muted color
  const WalkingFigure = ({ frame, hue }: { frame: number; hue: number }) => {
    const walkCycle = frame % 4;
    const color = `hsl(${hue}, 35%, 55%)`;
    return (
      <svg width="24" height="36" viewBox="0 0 24 36" className="sm:w-8 sm:h-12 md:w-10 md:h-14">
        <circle cx="12" cy="5" r="5" fill={color} />
        <line x1="12" y1="10" x2="12" y2="22" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <line x1="12" y1="14" x2={walkCycle < 2 ? "4" : "20"} y2={walkCycle % 2 === 0 ? "20" : "12"} stroke={color} strokeWidth="4" strokeLinecap="round" />
        <line x1="12" y1="14" x2={walkCycle < 2 ? "20" : "4"} y2={walkCycle % 2 === 0 ? "12" : "20"} stroke={color} strokeWidth="4" strokeLinecap="round" />
        {walkCycle === 0 && (
          <>
            <line x1="12" y1="22" x2="3" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <line x1="12" y1="22" x2="21" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {walkCycle === 1 && (
          <>
            <line x1="12" y1="22" x2="7" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <line x1="12" y1="22" x2="17" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {walkCycle === 2 && (
          <>
            <line x1="12" y1="22" x2="21" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <line x1="12" y1="22" x2="3" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {walkCycle === 3 && (
          <>
            <line x1="12" y1="22" x2="17" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <line x1="12" y1="22" x2="7" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
      </svg>
    );
  };

  // Geometric shape components with muted colors
  const SpinningTriangle = ({ hue, size }: { hue: number; size: number }) => {
    const color = `hsl(${hue}, 30%, 50%)`;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,2 22,20 2,20" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  };

  const PulsingCircle = ({ hue, size, frame }: { hue: number; size: number; frame: number }) => {
    const color = `hsl(${hue}, 30%, 45%)`;
    const pulseSize = 6 + (frame % 4) * 1.5;
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r={pulseSize} fill="none" stroke={color} strokeWidth="4" />
        <circle cx="12" cy="12" r={pulseSize * 0.4} fill={color} opacity="0.6" />
      </svg>
    );
  };

  const SpinningStar = ({ hue, size, points }: { hue: number; size: number; points: number }) => {
    const color = `hsl(${hue}, 35%, 50%)`;
    const starPoints = Array.from({ length: points }, (_, i) => {
      const angle = (i / points) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? 10 : 5;
      return `${12 + r * Math.cos(angle)},${12 + r * Math.sin(angle)}`;
    }).join(' ');
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points={starPoints} fill={color} stroke={color} strokeWidth="2" opacity="0.8" />
      </svg>
    );
  };

  const WavyLine = ({ hue, frame }: { hue: number; frame: number }) => {
    const color = `hsl(${hue}, 25%, 55%)`;
    const offset = (frame % 8) * 3;
    return (
      <svg width="30" height="20" viewBox="0 0 30 20">
        <path
          d={`M 0 10 Q ${5 + offset % 10} ${5 - (frame % 4)}, 15 10 T 30 10`}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  // Generate figures for each ring - varying sizes, overlapping, more circles
  const rings = [
    { radius: 47, scale: 1.3, count: 24, type: 'circle', offset: 0 },
    { radius: 44, scale: 0.5, count: 32, type: 'circle', offset: 7 },
    { radius: 41, scale: 1.0, count: 28, type: 'circle', offset: 3 },
    { radius: 38, scale: 0.6, count: 36, type: 'circle', offset: 10 },
    { radius: 35, scale: 0.9, count: 26, type: 'circle', offset: 5 },
    { radius: 32, scale: 0.4, count: 40, type: 'circle', offset: 12 },
    { radius: 29, scale: 1.1, count: 22, type: 'circle', offset: 8 },
    { radius: 26, scale: 0.55, count: 34, type: 'circle', offset: 2 },
    { radius: 23, scale: 0.8, count: 30, type: 'circle', offset: 15 },
  ];

  return (
    <div className="container py-6">
      <h1 className="font-league mb-6">Spin</h1>

      <div className="flex flex-col items-center gap-8">
        {/* Vinyl Record with Zoetrope */}
        <div className="relative">
          {/* Record */}
          <div
            className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl overflow-hidden"
            style={{ transform: mounted ? `rotate(${rotation}deg)` : 'rotate(0deg)' }}
          >
            {/* Base color layer - covers the black */}
            <div className="absolute inset-0 rounded-full bg-[#d4875a]" />

            {/* Complex overlapping animated elements - all spinning same direction */}
            {rings.map((ring, ringIndex) =>
              Array.from({ length: ring.count }, (_, i) => {
                // Add offset to create overlapping positions between rings
                const angle = (i / ring.count) * 360 + ring.offset;
                const angleRad = (angle * Math.PI) / 180;
                const x = Math.round((50 + ring.radius * Math.sin(angleRad)) * 100) / 100;
                const y = Math.round((50 - ring.radius * Math.cos(angleRad)) * 100) / 100;
                const rotationCycles = Math.floor(rotation / 180);
                const animFrame = (i + ringIndex * 3 + rotationCycles) % frameCount;

                const trailCount = 4;
                const trailSpacing = 360 / ring.count / (trailCount + 1);
                const trailOpacities = [0.6, 0.45, 0.3, 0.15];

                const baseHue = (angle + ringIndex * 45) % 360;
                const animatedHue = Math.round((baseHue + rotation * 2) % 360);

                // Shapes spin slower than the record
                const shapeRotation = rotation * 0.3;

                const renderShape = (frame: number, hue: number, spin: number) => {
                  const spinStyle = { transform: `rotate(${spin}deg)` };
                  switch (ring.type) {
                    case 'triangle':
                      return <div style={spinStyle}><SpinningTriangle hue={hue} size={28} /></div>;
                    case 'circle':
                      return <div style={spinStyle}><PulsingCircle hue={hue} size={28} frame={frame} /></div>;
                    case 'star':
                      return <div style={spinStyle}><SpinningStar hue={hue} size={28} points={10} /></div>;
                    default:
                      return <WalkingFigure frame={frame} hue={hue} />;
                  }
                };

                return (
                  <div key={`${ringIndex}-${i}`}>
                    {Array.from({ length: trailCount }, (_, t) => {
                      const trailAngle = Math.round((angle - (t + 1) * trailSpacing) * 100) / 100;
                      const trailAngleRad = (trailAngle * Math.PI) / 180;
                      const trailX = Math.round((50 + ring.radius * Math.sin(trailAngleRad)) * 100) / 100;
                      const trailY = Math.round((50 - ring.radius * Math.cos(trailAngleRad)) * 100) / 100;
                      const trailFrame = (animFrame - t - 1 + frameCount) % frameCount;
                      const trailHue = Math.round((animatedHue - (t + 1) * 15 + 360) % 360);
                      const trailSpin = shapeRotation - (t + 1) * 10;
                      return (
                        <div
                          key={`trail-${t}`}
                          className="absolute"
                          style={{
                            left: `${trailX}%`,
                            top: `${trailY}%`,
                            transform: `translate(-50%, -50%) scale(${ring.scale})`,
                            opacity: mounted && isSpinning ? trailOpacities[t] : 0,
                          }}
                        >
                          {renderShape(trailFrame, trailHue, trailSpin)}
                        </div>
                      );
                    })}
                    <div
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) scale(${ring.scale})`,
                      }}
                    >
                      {renderShape(animFrame, animatedHue, shapeRotation)}
                    </div>
                  </div>
                );
              })
            )}

            {/* Additional overlay ring - slower spin */}
            <div
              className="absolute inset-[5%] rounded-full pointer-events-none"
              style={{ transform: mounted ? `rotate(${rotation * 0.2}deg)` : 'rotate(0deg)' }}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * 360 + 15;
                const angleRad = (angle * Math.PI) / 180;
                const x = Math.round((50 + 44 * Math.sin(angleRad)) * 100) / 100;
                const y = Math.round((50 - 44 * Math.cos(angleRad)) * 100) / 100;
                const hue = Math.round((angle + rotation * 0.5) % 360);
                return (
                  <div
                    key={`overlay-${i}`}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%, -50%) rotate(${rotation * 0.3}deg)`,
                      opacity: 0.5,
                    }}
                  >
                    <WavyLine hue={hue} frame={Math.floor(rotation / 30) + i} />
                  </div>
                );
              })}
            </div>

            {/* Label - spins faster than animation but slower than record */}
            <div
              className="absolute inset-[35%] rounded-full bg-gradient-to-br from-red-700 via-red-600 to-red-800 flex items-center justify-center z-10"
              style={{ transform: mounted ? `rotate(${-rotation + rotation * 0.5}deg)` : 'rotate(0deg)' }}
            >
              <div className="text-center">
                <div className="text-white font-bold text-xs sm:text-sm md:text-base">
                  {site.shortName.toUpperCase()}
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
