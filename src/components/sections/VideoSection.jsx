export function VideoSection() {
  return (
    <section
      className="relative z-20 -mt-[30%] bg-mustard pt-16 pb-32 sm:pt-20 sm:pb-36 md:-mt-[22%] md:pt-20 md:pb-44"
    >
      <div className="flex w-full items-center justify-center gap-6 px-6 md:gap-20">
        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="hidden w-36 md:block lg:w-52"
        />

        {/* Straight from public/ (like every other media asset here) so Vite
            copies it into dist/ untouched — no re-encoding, no size limit
            from Vite's own asset pipeline (that only applies to imported
            assets, not public/ passthrough files). preload="metadata" keeps
            the initial page load light: only duration/dimensions load
            up front, the full file streams in once playback starts.
            min-w-0: a <video>, unlike the plain <div> it replaces, has an
            intrinsic width (624px, from the file's own resolution) that
            flex items don't shrink below by default — without this it was
            blowing out the row past the viewport at md/lg widths. */}
        <video
          src="/Video.mp4"
          controls
          playsInline
          preload="metadata"
          className="aspect-[490/353] w-[80%] max-w-lg min-w-0 rounded-2xl bg-black object-cover shadow-xl sm:w-[65%] md:w-[48%]"
        >
          Your browser doesn&apos;t support embedded video.
        </video>

        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="hidden w-36 md:block lg:w-52"
        />
      </div>

      <img
        src="/flower-border.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-auto w-full"
      />
    </section>
  )
}
