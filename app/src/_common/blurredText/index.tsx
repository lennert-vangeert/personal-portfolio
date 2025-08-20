import { generateRandomText } from "@common/scrambleText";

const BlurredText = ({ length }: { length: number }) => {
  return (
    <span style={{ filter: "blur(4px)" }}>{generateRandomText(length)}</span>
  );
};

export default BlurredText;
