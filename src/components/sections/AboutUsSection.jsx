import { ABOUT_US_CHAPTERS } from '../../lib/aboutUsChapters'
import { ChapterFrame } from '../ui/ChapterFrame'

// Chapter title/text styling. Alignment is the caller's job (grid order classes).
// `alignRight`: the body paragraph gets its own max-width, which shrinks its box
// smaller than the (full-width) title/eyebrow above it — a max-width alone only
// narrows a block box, it doesn't reposition it, so on the mirrored (right-aligned)
// chapters that left the paragraph's own right edge short of the title's right
// edge instead of sharing it. sm:ml-auto pushes the now-narrower box itself to the
// right so its edge lines up with the title/eyebrow above.
function ChapterCopy({ chapter, alignRight = false }) {
  return (
    <>
      {/* Figma: Source Code Pro SemiBold 12px/100%/0%, uppercase */}
      <p className="font-label text-[12px] font-semibold uppercase leading-none tracking-normal text-[#083040]">
        {chapter.eyebrow}
      </p>
      {/* Figma: Source Code Pro SemiBold 26px/100%/0% */}
      <h3 className="font-label mt-2 text-[26px] font-semibold leading-none tracking-normal text-[#083040] sm:whitespace-nowrap">
        {chapter.title.split('\n').map((line, index, lines) => (
          <span key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </h3>
      {/* Figma: Source Code Pro Medium 10.95px/14.37px/-7% */}
      <p
        className={`font-label mt-2 text-[10.95px] font-medium leading-[14.37px] tracking-[-0.07em] text-white sm:max-w-[360px] ${alignRight ? 'sm:ml-auto' : ''}`}
      >
        {chapter.text}
      </p>
    </>
  )
}

// "Our Story.png" (the full sky-to-palace artwork) is split into four
// assets, used differently per breakpoint because mobile and desktop need
// genuinely different strategies here — not just different sizes:
//
// Below sm: (single-column, stacked chapters can run to ~7600px tall,
// well past the source's own ~5300px of usable sky) —
//  - our-story-sky-header.webp: the top of the source (y0–3500), the
//    actual pink-to-blue gradient, shown once at its true width-scaled
//    size — never stretched, so it's always crisp.
//  - our-story-sky-tile.webp: a self-similar 800px-tall bird-free swatch
//    cropped from y3500–4300 (its own top/bottom rows are near-identical
//    in color — verified by sampling — for a seamless repeat),
//    `background-repeat: repeat-y` behind the header to fill however much
//    extra height the 12 stacked chapters need. Tiling repeats existing
//    pixels instead of stretching them, so it never has to upscale past
//    native resolution — which was the earlier version's actual source of
//    blur/noise on mobile.
//
// sm: and up (2-column chapters keep total content height under ~4750px,
// comfortably less than the source's ~5300px of sky) — a plain
// object-cover on the *whole* sky region (our-story-sky.webp, y0–5300) is
// enough on its own: never upscaled, never tiled. Tiling was tried
// everywhere at first, but at desktop's much larger render scale the
// same swatch's fine brush-stroke texture visibly "resets" at each
// 800px repeat even though the color matches — invisible once shrunk
// ~5x for mobile, but visible at desktop's near-native scale. So desktop
// gets the one continuous image instead, which was never short on
// pixels to begin with.
//
// Both breakpoints end in the same our-story-palace.webp footer (see
// below) — its own top rows (y5000) were color-matched against both the
// tile and the plain sky crop for a seamless handoff either way.
export function AboutUsSection() {
  return (
    <div className="relative">
      <div className="relative bg-[#7e93a0]">
        {/* No negative z-index here — an absolutely-positioned child with a
            negative z-index escapes this div's own stacking context (it
            isn't one without its own z-index) and can end up behind some
            unrelated ancestor's background instead of just behind its
            sibling below. Keeping both this and the content div at
            non-negative z-index, with the content on top, avoids that. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-repeat-y sm:hidden"
          style={{ backgroundImage: "url('/our-story-sky-tile.webp')", backgroundSize: '100% auto' }}
        />
        <img
          src="/our-story-sky-header.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-0 w-full sm:hidden"
        />
        <img
          src="/our-story-sky.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 hidden h-full w-full object-cover sm:block"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-10 sm:pb-4 sm:pt-16">
          <header>
            {/* w-fit: the wrapper's width is set by its widest child — the
                heading — so the flanking texts' flex row below shares the
                exact same left/right edges as the heading, instead of the
                edges of the outer (much wider) content column. */}
            <div className="mx-auto w-fit max-w-full">
              {/* Below sm, "Boston, 2023..." and "SUMMER 2023 / BOSTON" stack
                  instead of sharing a row — side by side, their nowrap lines
                  together are wider than the heading (which sets this
                  wrapper's width), so the second block was overflowing
                  silently past the viewport edge on narrow phones. */}
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                {/* Figma: Source Code Pro Medium 14.9px/100%/-7% */}
                <p className="font-label whitespace-nowrap text-center text-[11.5px] font-medium leading-none tracking-[-0.07em] text-white sm:text-left sm:text-[14.9px]">
                  Two impossibly busy people,
                  <br />
                  a few miles apart, slowly finding
                  <br />
                  their way to each other.
                </p>
                {/* Figma: DIN Medium 27.57px/111%/-7%, right-aligned */}
                <p className="font-heading whitespace-nowrap text-center text-base font-medium leading-[1.11] tracking-[-0.07em] text-navy sm:text-right sm:text-[27.57px]">
                  AUTUMN 2023
                  <br />
                  BOSTON
                </p>
              </div>

              {/* Figma: Source Code Pro Bold 83.89px/95.46px/-7% */}
              <h2 className="font-label mt-6 text-center text-[42px] font-bold leading-[1.1379] tracking-[-0.07em] text-navy sm:text-[64px] lg:text-[83.89px]">
                A Love Story
                <br />
                <span className="relative inline-block">
                  in Chapters
                  <img
                    src="/nimbu-mirchi-motif-cropped.png"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[93%] top-[78%] w-10 -translate-x-1/2 sm:w-14"
                  />
                </span>
              </h2>
            </div>
          </header>

          <ol className="mt-24 flex flex-col gap-16 sm:mt-28 sm:gap-20">
            {ABOUT_US_CHAPTERS.map((chapter, index) => {
              const frameFirst = index % 2 === 0
              return (
                <li
                  key={chapter.id}
                  className={`grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-10 ${
                    frameFirst ? '' : 'sm:translate-x-[13px]'
                  }`}
                >
                  {/* Reference mock (About Us Page.png) centers each frame on
                      its own title rather than sinking to the bottom of the
                      paragraph — the sm:-mt pulls it up so it leads into the
                      title from above instead of trailing the text. Frame
                      stays pinned to sm:self-start (its position must not
                      move) regardless of the row's height. */}
                  <div
                    className={`mx-auto sm:self-start sm:-mt-14 ${frameFirst ? 'sm:order-1' : 'sm:order-2'}`}
                  >
                    <ChapterFrame photos={chapter.photos} />
                  </div>
                  {/* sm:self-end bottom-aligns the copy with the frame instead
                      of the two sharing a top edge. The -ml/-mr pulls it
                      toward the frame without touching the grid gap, which
                      would shift the frame's own column width/position. */}
                  <div
                    className={`min-w-0 text-center sm:self-end sm:text-left ${
                      frameFirst
                        ? 'sm:order-2 sm:-ml-[90px]'
                        : 'sm:order-1 sm:ml-auto sm:-mr-[90px] sm:text-right'
                    }`}
                  >
                    <ChapterCopy chapter={chapter} alignRight={!frameFirst} />
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      {/* Palace footer: a normal block-level image, not absolutely
          positioned — so it always renders right where it belongs, right
          after the last chapter's real content, at its own true size. */}
      <div className="relative">
        <img src="/our-story-palace.webp" alt="" aria-hidden="true" className="block w-full" />

        {/* Two sizes, not three: base = phones (<640px), sm: = everything
            else. The fixed pixel bottom/right/w below sm: was eating more
            than half the width on a narrow phone, so it's smaller there —
            on tablet/desktop, sm: values are what's actually showing, so
            edit those to move/resize it on a normal browser window. Hover
            for the tilak's significance — same tooltip copy/markup as the
            Palace section's tilak mark. */}
        <div
          tabIndex={0}
          className="group absolute bottom-6 right-8 z-10 w-28 cursor-help focus:outline-none sm:bottom-10 sm:right-20 sm:w-48"
        >
          <img
            src="/Tilak.png"
            alt="Rows of red tilak marks"
            className="h-auto w-full transition-transform duration-300 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-60 rounded-xl bg-maroon/95 px-4 py-2.5 text-left opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:w-72">
            <p className="font-label text-[11px] leading-relaxed tracking-wide text-cream">
              The tilak is a sacred mark of blessing in Indian culture — placed on the forehead to
              honor and welcome guests, invoke protection, and mark auspicious beginnings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
