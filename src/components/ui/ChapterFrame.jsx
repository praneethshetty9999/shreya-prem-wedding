import { useState } from 'react'

// frame-mask.png is generated from Frame.png itself (flood-filling everything
// enclosed by its arch outline solid) so the photo fill and the border overlay
// below share the exact same silhouette — no gap between where the photo ends
// and the frame's border begins, however Frame.png's arch is shaped.
const MASK_STYLE = {
  WebkitMaskImage: "url('/frame-mask.png')",
  maskImage: "url('/frame-mask.png')",
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
}

// A single frame from the "Our Story" wall: shows the first photo at rest,
// then steps through the rest of `photos` one at a time — advancing (and
// wrapping) on every fresh hover rather than on a timer, so re-entering the
// frame is what reveals the next photo.
export function ChapterFrame({ photos = [], className = '' }) {
  const [photoIndex, setPhotoIndex] = useState(0)

  function handleMouseEnter() {
    if (photos.length === 0) return
    setPhotoIndex((current) => (current + 1) % photos.length)
  }

  return (
    <div onMouseEnter={handleMouseEnter} className={`relative aspect-[52/69] w-full ${className}`}>
      <div className="absolute inset-0" style={MASK_STYLE}>
        {photos.map((src, index) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: index === photoIndex ? 1 : 0,
              transform: index === photoIndex ? 'scale(1)' : 'scale(1.04)',
              transition: 'opacity 1.5s ease-in-out, transform 1.8s ease-in-out',
            }}
          />
        ))}
      </div>

      {/* Frame.png's interior is transparent (only the arch outline is
          painted), so it drops straight on top of the masked photos as a
          decorative border — same 100% 100% stretch as the mask above
          (generated from this same image), so the two line up exactly. */}
      <img
        src="/Frame.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ objectFit: 'fill' }}
      />
    </div>
  )
}
