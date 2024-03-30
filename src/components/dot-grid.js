import React, { useEffect, useState } from "react";

// Dot component that changes color on hover
const Dot = ({ x, y, size, spacing, color = "lightgray" }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`dot-${x}-${y}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isHovered ? "black" : color,
        position: "absolute",
        left: `${x + spacing}px`,
        top: `${y + spacing}px`,
        scale: isHovered ? "1.2" : "1",
        borderRadius: "50%",
      }}
    />
  );
};

const DotGrid = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const size = 8;
  const spacing = 2;

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();

    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  const [scrollOffset, setScrollOffset] = useState(0);

  function getTextDots(scrollOffset, text = "ILLY", size = 8, spacing = 2) {
    const textDots = {};
    let xOffset = -scrollOffset;

    for (const char of text.toUpperCase()) {
      if (!alphabet[char]) continue;

      const charMatrix = alphabet[char];
      for (let y = 0; y < charMatrix.length; y++) {
        for (let x = 0; x < charMatrix[y].length; x++) {
          if (charMatrix[y][x] === 1) {
            const gridX = xOffset + x * (size + spacing);
            const gridY = y * (size + spacing);
            const key = `${gridX}-${gridY}`;
            textDots[key] = "black";
          }
        }
      }
      xOffset += charMatrix[0].length * (size + spacing) + spacing;
    }

    return textDots;
  }

  useEffect(() => {
    const scrollText = () => {
      setScrollOffset((prevOffset) => {
        // Increment scrollOffset to move text left to right
        let newOffset = prevOffset - 2;

        // Calculate the total width of the text
        let textWidth = 0;
        for (const char of "ILLY".toUpperCase()) {
          if (alphabet[char]) {
            textWidth += alphabet[char][0].length * (size + spacing) + spacing;
          }
        }

        // Reset scrollOffset to start again from the left once it has fully scrolled to the right
        if (newOffset > textWidth + window.innerWidth) {
          // Reset to start off-screen to the left
          newOffset = 0;
        }

        return newOffset;
      });
    };

    const intervalId = setInterval(scrollText, 20); // Adjust for smoother scrolling
    return () => clearInterval(intervalId);
  }, []);

  const calculateDots = () => {
    const dots = [];
    const size = 8; // Dot size
    const spacing = 2; // Space between dots
    // Calculate how many dots can fit in the total width and height
    const totalWidth = windowSize.width - (windowSize.width % (size + spacing));
    const totalHeight =
      windowSize.height - (windowSize.height % (size + spacing));

    const textDots = getTextDots(scrollOffset, "ILLY");

    // Ensure loops cover the entire grid by using <= totalWidth and <= totalHeight
    for (let x = 0; x <= totalWidth; x += size + spacing) {
      for (let y = 0; y <= totalHeight; y += size + spacing) {
        const key = `${x}-${y}`;
        const color = textDots[key] || "lightgray"; // Default color or text color
        dots.push(
          <Dot
            key={key}
            x={x}
            y={y}
            size={size}
            spacing={spacing}
            color={color}
          />
        );
      }
    }
    return dots;
  };

  return (
    <div style={{ position: "relative", margin: "4px" }}>{calculateDots()}</div>
  );
};

const alphabet = {
  A: [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
  ],
  B: [
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0],
  ],
  C: [
    [0, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0],
  ],
  D: [
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 0, 0],
  ],
  E: [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
  ],
  G: [
    [0, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0],
  ],
  H: [
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ],
  J: [
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 0],
  ],
  K: [
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0],
    [1, 0, 0, 1, 0, 0],
  ],
  L: [
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
  ],
  N: [
    [1, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0],
  ],
  Q: [
    [0, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1],
  ],
  R: [
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0],
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0],
  ],
  V: [
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
  W: [
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0],
  ],
  X: [
    [1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1],
  ],
  Y: [
    [1, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
  ],
  Z: [
    [1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
  ],
};

export default DotGrid;
