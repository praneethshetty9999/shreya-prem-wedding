// Shared timing for the card-figure → detail-overlay layoutId morph, so both
// directions of the transition move identically.
export const morphTransition = { duration: 0.6, ease: [0.32, 0.72, 0.22, 1] }

// Style for a div that displays only the figure region of a card image, by
// stretching the full image as a background so exactly `figureBox` (in % of
// the card) fills the element. Rendered over the card at the same box it is
// pixel-identical to the art beneath it — which lets us animate the figure
// alone while the card's text stays perfectly still.
//
// `figureNotch` (optional) clips a corner rectangle out of the crop where a
// card's rivet sits too close to the figure to exclude by shrinking the box:
// on the card the static rivet shows through the hole (rivets shouldn't move),
// and in the detail overlay the hole just shows the flat background color.
export function figureCropStyle({ src, figureBox, figureNotch }) {
  const { left, top, width, height } = figureBox
  const style = {
    backgroundImage: `url(${src})`,
    backgroundSize: `${10000 / width}% ${10000 / height}%`,
    backgroundPosition: `${(left / (100 - width)) * 100}% ${(top / (100 - height)) * 100}%`,
  }
  if (figureNotch) {
    const { corner, width: nw, height: nh } = figureNotch
    style.clipPath =
      corner === 'top-right'
        ? `polygon(0 0, ${100 - nw}% 0, ${100 - nw}% ${nh}%, 100% ${nh}%, 100% 100%, 0 100%)`
        : `polygon(0 0, 100% 0, 100% ${100 - nh}%, ${100 - nw}% ${100 - nh}%, ${100 - nw}% 100%, 0 100%)`
  }
  return style
}
