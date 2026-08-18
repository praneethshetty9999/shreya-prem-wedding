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

// "Our Story.png" (the full sky-to-palace artwork, originally one
// 1920x7678 image in main) is split into four assets here, used two
// different ways depending on breakpoint:
//
// Below lg (phones through tablets — anything narrower than a real
// laptop): the palace must always read as sitting at the *bottom*, with
// every chapter frame landing on the sky above it, never overlapping —
// main's own single continuous image can't guarantee that at every
// in-between width (2-column content height doesn't scale in lockstep
// with viewport width, so a fixed aspect-ratio reservation can end up
// too short, dropping chapters onto the palace artwork oddly). So:
//  - our-story-sky-header.webp: the top of the source (y0–3500), the
//    actual pink-to-blue gradient, shown once at its true width-scaled
//    size — never stretched, so it's always crisp.
//  - our-story-sky-tile.webp: a self-similar 800px-tall bird-free swatch
//    cropped from y3500–4300 (its own top/bottom rows are near-identical
//    in color — verified by sampling — for a seamless repeat),
//    `background-repeat: repeat-y` behind the header to fill however much
//    extra height the content needs. Tiling repeats existing pixels
//    instead of stretching them, so it never has to upscale past native
//    resolution.
//  - our-story-palace.webp appended after as a normal block image, full
//    native size, right after the last chapter — guaranteed to start
//    only once every chapter has already rendered, whatever the content
//    height at that width turned out to be.
//
// lg: and up (real desktop widths, where main's own proportions were
// tuned and verified to already work) — reproduces main's exact
// technique: the wrapper gets `lg:aspect-[1920/7678]`, the *same* ratio
// as the original single image, so it reserves precisely the height main
// reserved (growing taller only if content ever needs more — same
// aspect-ratio trick main used). our-story-sky.webp (source y0–5300)
// sits at its own true, unstretched size at the top; our-story-
// palace.webp (source y2678, representing y5000–7678) is absolutely
// positioned at `top: 5000/7678` so it resumes exactly where the two
// source crops were split, 300px of deliberate overlap and all —
// reproducing main's look where the last couple of chapters visually sit
// over the palace artwork, which only holds up at genuinely wide
// viewports.
//
// Both breakpoints' palace crops share the same top rows (source y5000) —
// color-matched against both the tile and the plain sky edge so the
// handoff reads as one continuous painting either way.
export function AboutUsSection() {
  return (
    <div className="relative">
      <div className="relative bg-[#7e93a0] lg:aspect-[1920/7678]">
        {/* No negative z-index here — an absolutely-positioned child with a
            negative z-index escapes this div's own stacking context (it
            isn't one without its own z-index) and can end up behind some
            unrelated ancestor's background instead of just behind its
            sibling below. Keeping both this and the content div at
            non-negative z-index, with the content on top, avoids that. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-repeat-y lg:hidden"
          style={{ backgroundImage: "url('/our-story-sky-tile.webp')", backgroundSize: '100% auto' }}
        />
        <img
          src="/our-story-sky-header.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-0 w-full lg:hidden"
        />
        <img
          src="/our-story-sky.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-0 hidden w-full lg:block"
        />
        {/* top: 5000/7678 — resumes the source image exactly where the sky
            crop (y0–5300) and palace crop (representing y5000–7678) were
            split, so the 300px overlap lines the two up seamlessly at
            main's own scale. */}
        <img
          src="/our-story-palace.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 z-0 hidden w-full lg:block"
          style={{ top: `${(5000 / 7678) * 100}%` }}
        />

        {/* pb-10 (not pb-4): below lg the palace footer sits in normal
            flow immediately after this div, with no aspect-ratio slack
            reserved beneath the last chapter — without this buffer the
            tilak corner accent would sit right on top of the last
            chapter's text instead of in clear space, the same reason
            mobile alone needed it before this padding applied to the
            whole below-lg range. */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-10 sm:pt-16 lg:pb-4">
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
                      would shift the frame's own column width/position. A
                      flat -90px (sized for full desktop's ~428px columns)
                      applied starting at sm:'s 640px was overlapping the
                      copy text under the frame image at tablet widths,
                      where a 2-column row is only ~276-340px per column —
                      90px there eats a third of the column. Scaling the
                      pull up across sm/md/lg keeps it proportionate to the
                      actual column width at each size, landing on the
                      original -90px only once lg: (1024px+) columns are
                      wide enough for it — matching main exactly at real
                      desktop widths without breaking the tablet range in
                      between. */}
                  <div
                    className={`min-w-0 text-center sm:self-end sm:text-left ${
                      frameFirst
                        ? 'sm:order-2 sm:-ml-[8px] md:-ml-[45px] lg:-ml-[90px]'
                        : 'sm:order-1 sm:ml-auto sm:-mr-[8px] md:-mr-[45px] lg:-mr-[90px] sm:text-right'
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

      {/* Below-lg palace footer: a normal block-level image, not
          absolutely positioned — so it always renders right where it
          belongs, right after the last chapter's real content, at its own
          true size, whatever that content height turned out to be at this
          width. lg: and up already have the palace absolutely positioned
          inside the aspect-ratio box above, so this is hidden there to
          avoid rendering (and reserving height for) it twice. */}
      <img
        src="/our-story-palace.webp"
        alt=""
        aria-hidden="true"
        className="block w-full lg:hidden"
      />

      {/* Tilak sits outside both palace renderings, anchored to this
          outermost wrapper's own bottom edge instead — below lg that
          coincides with the palace footer just above; on lg: and up it
          coincides with the aspect-ratio box's bottom, which was sized to
          land exactly at the (also absolutely-positioned) palace image's
          bottom edge. One element instead of duplicating it per
          breakpoint. Two sizes, not three: base = phones (<640px), sm: =
          everything else up to and including tablets. The fixed pixel
          bottom/right/w below sm: was eating more than half the width on
          a narrow phone, so it's smaller there — on tablet/desktop, sm:
          values are what's actually showing, so edit those to move/
          resize it on a normal browser window. Hover for the tilak's
          significance — same tooltip copy/markup as the Palace section's
          tilak mark. */}
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
  )
}
