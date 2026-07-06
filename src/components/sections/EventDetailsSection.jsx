const TOP_LEFT_EVENTS = [
  { src: '/Card1.png', alt: 'March 3rd — Haldi' },
  { src: '/Card2.png', alt: 'March 4th — Kerala Wedding' },
  { src: '/Card3.png', alt: 'March 3rd — Sufi Night' },
  { src: '/Card4.png', alt: 'March 4th — Mehendi & Sangeet' },
]

export function EventDetailsSection() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch md:gap-8">
      <div className="grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2 md:gap-8">
        {TOP_LEFT_EVENTS.map((card) => (
          <img
            key={card.src}
            src={card.src}
            alt={card.alt}
            className="mx-auto w-[88%] rounded-xl shadow-md md:w-[93%]"
          />
        ))}
      </div>

      <div className="md:col-span-1">
        <img
          src="/Card5.png"
          alt="March 5th — Shaadi, followed by Reception & After Party"
          className="mx-auto h-auto w-[88%] rounded-xl object-cover shadow-md md:h-full md:w-full"
        />
      </div>
    </div>
  )
}
