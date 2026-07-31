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

// All 12 chapters sit on `fort-sky.png` — a bird-free crop of Fort 1.png's
// upper sky, stretched to fill however tall the chapter list ends up (long
// copy, narrow viewport, whatever). `fort-bottom.png` and `fort-footer.png`
// are the rest of that same photo (birds + palace, then the mock's
// decorative closing graphic) and only ever follow in normal document flow,
// undistorted, never underneath the stretched sky.
export function AboutUsSection() {
  return (
    <div>
      <div style={{ backgroundImage: "url('/fort-sky.png')", backgroundSize: '100% 100%' }}>
        <div className="mx-auto max-w-4xl px-6 pb-4 pt-16 sm:pt-24">
          <header>
            {/* w-fit: the wrapper's width is set by its widest child — the
                heading — so the flanking texts' flex row below shares the
                exact same left/right edges as the heading, instead of the
                edges of the outer (much wider) content column. */}
            <div className="mx-auto w-fit max-w-full">
              <div className="flex items-end justify-between gap-6">
                <p className="font-label whitespace-nowrap text-left text-[13px] leading-snug text-white sm:text-sm">
                  Boston, 2023.
                  <br />
                  Two impossibly busy people,
                  <br />
                  a few miles apart, slowly finding
                  <br />
                  their way to each other.
                </p>
                <p className="font-heading whitespace-nowrap text-right text-base font-bold leading-tight text-navy sm:text-lg">
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
                  className="grid grid-cols-1 items-end gap-6 sm:grid-cols-2 sm:gap-10"
                >
                  <div
                    className={`mx-auto w-[13rem] sm:w-[15.6rem] ${frameFirst ? 'sm:order-1' : 'sm:order-2'}`}
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

      <img src="/fort-bottom.png" alt="" className="block w-full" />
      <img src="/fort-footer.png" alt="" className="block w-full" />
    </div>
  )
}
