import React, { useEffect, useState } from "react";

type Shape = {
  id: number;
  color: string;
  size: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  borderRadius: number[]; // 8 numbers for smooth interpolation
  targetBorderRadius: number[];
};

const COLORS = ["#646364ff", "#646364ff", "#646364ff", "#646364ff"];
const NUM_SHAPES = 4;
const UPDATE_INTERVAL = 100; 
const MAX_DRIFT = 0.1;

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const randomBorderRadiusArray = () =>
  Array.from({ length: 8 }, () => random(40, 60));

const interpolate = (current: number[], target: number[], factor: number) =>
  current.map((c, i) => c + (target[i] - c) * factor);

const borderRadiusArrayToString = (arr: number[]) =>
  `${arr[0]}% ${arr[1]}% ${arr[2]}% ${arr[3]}% / ${arr[4]}% ${arr[5]}% ${arr[6]}% ${arr[7]}%`;

const FloatingBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const initialShapes: Shape[] = Array.from({ length: NUM_SHAPES }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      size: random(300, 450),
      x: random(0.2, 0.8) * window.innerWidth,
      y: random(0.2, 0.8) * window.innerHeight,
      dx: random(-MAX_DRIFT, MAX_DRIFT),
      dy: random(-MAX_DRIFT, MAX_DRIFT),
      borderRadius: randomBorderRadiusArray(),
      targetBorderRadius: randomBorderRadiusArray(),
    }));
    setShapes(initialShapes);

    const interval = setInterval(() => {
      setShapes(prevShapes =>
        prevShapes.map(shape => {
          // Move shapes
          let newX = shape.x + shape.dx;
          let newY = shape.y + shape.dy;
          let dx = Math.abs(newX - shape.x) > 50 ? -shape.dx : shape.dx;
          let dy = Math.abs(newY - shape.y) > 50 ? -shape.dy : shape.dy;

          // Morph borderRadius
          const newBorderRadius = interpolate(shape.borderRadius, shape.targetBorderRadius, 0.05);
          const reachedTarget = newBorderRadius.every(
            (val, idx) => Math.abs(val - shape.targetBorderRadius[idx]) < 0.5
          );
          const targetBorderRadius = reachedTarget ? randomBorderRadiusArray() : shape.targetBorderRadius;

          return {
            ...shape,
            x: newX,
            y: newY,
            dx,
            dy,
            borderRadius: newBorderRadius,
            targetBorderRadius,
          };
        })
      );
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {shapes.map(shape => (
          <div
            key={shape.id}
            style={{
              position: "absolute",
              width: shape.size,
              height: shape.size,
              top: shape.y,
              left: shape.x,
              background: shape.color,
              borderRadius: borderRadiusArrayToString(shape.borderRadius),
              filter: "blur(700px)",
              opacity: 0.6,
              transition: `all ${UPDATE_INTERVAL}ms linear`,
            }}
          />
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default FloatingBackground;
