import { ABOUT_US_CHAPTERS } from '../../lib/aboutUsChapters'
import { ChapterFrame } from '../ui/ChapterFrame'

// Chapter title/text styling. Alignment is the caller's job (grid order classes).
function ChapterCopy({ chapter }) {
  return (
    <>
      {/* Figma: DIN Medium 26px/100%/0%, #083040 — bumped up + bolder per feedback */}
      <h3 className="font-heading w-[calc(100%+5px)] text-[30px] font-bold leading-none tracking-normal text-[#083040]">
        {chapter.title}
      </h3>
      {/* Figma: Source Code Pro Medium 10.95px/14.37px/-7%, #FFFFFF — bumped up a bit per feedback */}
      <p className="font-label mt-3 text-[13px] font-medium leading-[17px] tracking-[-0.07em] text-white">
        {chapter.text}
      </p>
    </>
  )
}

// `About.webp` is the full sky-to-palace backdrop. At `sm` and up the
// two-column chapter layout is short enough (relative to the image's own
// width-locked height) that the original top-anchored approach always shows
// the complete image: the wrapper's `sm:aspect-[1920/7327]` (the image's
// native size) reserves at least that much height, growing taller still if
// content ever needs more, with `about-sky-tile.jpg` (see below) covering
// whatever gap that leaves beneath the image.
//
// Below `sm`, though, the chapters stack into a single column that runs
// *far* taller than that ratio implies, so the same top-anchored approach
// used to strand the palace mid-page. There, height is left purely
// content-driven and a *separate, shorter* crop —
// `about-palace-mobile.jpg`, About.webp's bottom 2400px (still plenty of
// sky to blend into the tile above it) — is anchored to the bottom instead.
// Using the full 7327px image there would mean the bottom-padding needed to
// guarantee it never starts before the content ends (which has to equal the
// image's own rendered height, see the padding note below) turns into a
// multi-thousand-pixel stretch of near-empty scrolling; the short crop
// keeps that reserve proportionally small while still always landing on
// the palace itself, not a random slice of sky partway down the full image.
export function AboutUsSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#cdb7b2] to-[#7e93a0] sm:aspect-[1920/7327]">
      {/* `about-sky-tile.jpg` is a 900px-tall bird-free crop of About.webp's
          own top, mirrored onto itself (crop + the same crop flipped) so its
          own top and bottom rows match — that's what lets it repeat-y with
          no visible seam. Sized only for whatever's left above the real
          image below, so the "leftover" area on mobile — most of the page,
          since the single-column chapter stack runs much taller than the
          image's own width-locked height — reads as more sky rather than a
          flat color. sm:hidden because the real image alone already covers
          the full height there (see the aspect-ratio note above). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-top bg-repeat-y sm:hidden"
        style={{ backgroundImage: "url('/about-sky-tile.jpg')", backgroundSize: '100% auto' }}
      />
      {/* The tile above always resolves back to its own crop's top color at
          every repeat boundary (that's what makes it loop seamlessly), which
          is a warm pink — but about-palace-mobile.jpg (below) opens on a
          much cooler blue-teal, since there's no bird-free sky left to crop
          a matching tile from that deep into the image. Left alone, the two
          meet in a hard color jump right where the palace crop starts. This
          band sits directly above that seam (`bottom: 125vw` lines its own
          bottom edge up with the palace crop's top edge, whatever the page's
          actual content height ends up being) and fades from transparent —
          so it leaves the tile's own texture untouched everywhere else on
          the page — down to that same blue-teal (#7c989c, sampled from the
          palace crop's own top edge), so the color's already most of the
          way there before the real crop begins instead of jumping all at
          once. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 z-[1] bg-gradient-to-b from-transparent to-[#7c989c] sm:hidden"
        style={{ bottom: '125vw', height: '55vw' }}
      />
      {/* No negative z-index here — an absolutely-positioned child with a
          negative z-index escapes this div's own stacking context (it
          isn't one without its own z-index) and can end up behind some
          unrelated ancestor's background instead of just behind its
          sibling below. Keeping both this and the content div at
          non-negative z-index, with the content on top, avoids that. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-0 sm:hidden">
        <img src="/about-palace-mobile.jpg" alt="" className="block w-full" />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 z-0 hidden sm:block">
        <img src="/About.webp" alt="" className="block w-full" />
      </div>

      {/* pb-[128vw]: has to be at least as tall as about-palace-mobile.jpg
          itself ever renders (viewport-width * 2400/1920, i.e. ~125vw) so
          the palace crop — anchored to the very bottom of this section —
          never starts before the actual chapter content ends, no matter how
          much (or little) text a given chapter's copy runs, or how many
          chapters there are: that relationship holds regardless of content
          length, since both scrollHeight and the reserved padding grow by
          the same amount together. sm:pb-4 because desktop doesn't
          bottom-anchor at all (see the aspect-ratio note above), so it
          never needs this reserve. */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-[128vw] pt-8 sm:pb-4 sm:pt-14">
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
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <p className="font-label whitespace-nowrap text-center text-[11.5px] leading-snug text-white sm:text-left sm:text-sm">
                Boston, 2023.
                <br />
                Two impossibly busy people,
                <br />
                a few miles apart, slowly finding
                <br />
                their way to each other.
              </p>
              <p className="font-heading whitespace-nowrap text-center text-base font-bold leading-tight text-navy sm:text-right sm:text-[25px]">
                SUMMER 2023
                <br />
                BOSTON
              </p>
            </div>

            {/* Figma: DIN Bold Alternate 83.89px/95.46px/-5% */}
            <h2 className="font-heading mt-6 text-center text-[42px] font-bold leading-[1.1379] tracking-[-0.05em] text-navy sm:text-[64px] lg:text-[83.89px]">
              A Love Story in
              <br />
              <span className="relative inline-block">
                Chapters
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
                className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 sm:gap-10"
              >
                {/* Reference mock (About Us Page.png) centers each frame on
                    its own title rather than sinking to the bottom of the
                    paragraph — the sm:-mt pulls it up so it leads into the
                    title from above instead of trailing the text. */}
                <div
                  className={`-mt-8 mx-auto sm:-mt-14 ${frameFirst ? 'sm:order-1' : 'sm:order-2'}`}
                >
                  <ChapterFrame photos={chapter.photos} />
                </div>
                <div className={`text-center sm:text-left ${frameFirst ? 'sm:order-2' : 'sm:order-1 sm:text-right'}`}>
                  <ChapterCopy chapter={chapter} />
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
