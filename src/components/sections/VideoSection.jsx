export function VideoSection() {
  return (
    <section
      className="relative z-20 -mt-[22.7%] bg-mustard pt-16 pb-32 sm:pt-20 sm:pb-36 md:-mt-[16.7%] md:pt-20 md:pb-44"
    >
      <div className="flex w-full items-center justify-center gap-6 px-6 md:gap-20">
        <img
          src="/Flower.png"
          alt=""
          aria-hidden="true"
          className="hidden w-36 md:block lg:w-52"
        />

        <div
          role="img"
          aria-label="Video placeholder"
          className="aspect-[490/353] w-[80%] max-w-lg rounded-2xl bg-cover bg-center shadow-xl sm:w-[65%] md:w-[48%]"
          style={{ backgroundImage: "url('/red-rectangle.png')" }}
        />

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
