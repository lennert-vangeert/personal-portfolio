import React, { useState, useEffect } from "react";

interface ScrambleTextProps {
  length: number;
}
export function generateRandomText(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const ScrambleText: React.FC<ScrambleTextProps> = ({ length }) => {
  const [text, setText] = useState(generateRandomText(length));

  useEffect(() => {
    const interval = setInterval(() => {
      setText(generateRandomText(length));
    }, 100); // Change text every .1 seconds

    return () => clearInterval(interval);
  }, [length]);

  return <span>{text}</span>;
};

export default ScrambleText;
