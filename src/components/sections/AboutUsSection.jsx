import { ABOUT_US_CHAPTERS } from '../../lib/aboutUsChapters'
import { ChapterFrame } from '../ui/ChapterFrame'

// Chapter title/text styling. Alignment is the caller's job (grid order classes).
function ChapterCopy({ chapter }) {
  return (
    <>
      {/* Figma: DIN Medium 26px/100%/0%, #083040 — bumped up + bolder per feedback */}
      <h3 className="font-heading text-[30px] font-bold leading-none tracking-normal text-[#083040]">
        {chapter.title}
      </h3>
      {/* Figma: Source Code Pro Medium 10.95px/14.37px/-7%, #FFFFFF — bumped up a bit per feedback */}
      <p className="font-label mt-3 text-[13px] font-medium leading-[17px] tracking-[-0.07em] text-white">
        {chapter.text}
      </p>
    </>
  )
}

// `fort-sky.png` and `fort-bottom.png` are the top two-thirds of the same
// fort photo (plain sky, then birds + palace silhouette), stacked here at
// their true, undistorted size — no more stretching the sky to match
// whatever height the chapter list happens to need. Instead the chapters
// flow as normal content *on top of* that stacked pair (position: absolute
// behind them), so chapters can now land on the sky, the birds/silhouette
// section, or both, however the content naturally falls at a given screen
// size. The wrapper's `aspect-[1440/5200]` (the two images' combined native
// size) reserves at least that much height so the full palace + its border
// always shows — never cropped short the way plain content-driven height
// would if the chapters happened to end a bit early. If content is taller
// than that (long copy, narrow viewport), the wrapper still grows to fit it
// as normal, and `bg-[#7e93a0]` (matching the overlay's own backdrop) covers
// the gap below where the images run out. `fort-footer.png` stays a true
// in-flow sibling below, so it always lands right after the real end of
// content instead of needing to coordinate heights with anything.
export function AboutUsSection() {
  return (
    <div>
      <div className="relative aspect-[1440/5200] bg-[#7e93a0]">
        {/* No negative z-index here — an absolutely-positioned child with a
            negative z-index escapes this div's own stacking context (it
            isn't one without its own z-index) and can end up behind some
            unrelated ancestor's background instead of just behind its
            sibling below. Keeping both this and the content div at
            non-negative z-index, with the content on top, avoids that. */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 z-0">
          <img src="/fort-sky.png" alt="" className="block w-full" />
          <img src="/fort-bottom.png" alt="" className="block w-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-4 pt-16 sm:pt-24">
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
                <p className="font-label whitespace-nowrap text-center text-[13px] leading-snug text-white sm:text-left sm:text-sm">
                  Boston, 2023.
                  <br />
                  Two impossibly busy people,
                  <br />
                  a few miles apart, slowly finding
                  <br />
                  their way to each other.
                </p>
                <p className="font-heading whitespace-nowrap text-center text-base font-bold leading-tight text-navy sm:text-right sm:text-lg">
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

          <ol className="mt-16 flex flex-col gap-16 sm:gap-20">
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
                    className={`mx-auto w-[13rem] sm:w-[15.6rem] sm:-mt-14 ${frameFirst ? 'sm:order-1' : 'sm:order-2'}`}
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

      <img src="/fort-footer.png" alt="" className="block w-full" />
    </div>
  )
}
