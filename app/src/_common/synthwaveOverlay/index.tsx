/**
 * Global, fixed CRT/synthwave skin: a perspective grid at the horizon and a
 * subtle scanline overlay. Both are decorative and pointer-events:none.
 * Motion (grid scroll) is gated behind prefers-reduced-motion in main.css.
 */
const SynthwaveOverlay = () => (
  <>
    <div className="synth-grid" aria-hidden="true" />
    <div className="scanlines" aria-hidden="true" />
    <div className="static-noise" aria-hidden="true" />
  </>
);

export default SynthwaveOverlay;
