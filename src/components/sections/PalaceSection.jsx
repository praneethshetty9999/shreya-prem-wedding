export function PalaceSection() {
  return (
    <div className="relative aspect-[3/4] w-full md:aspect-[6/5]">
      <img
        src="/logo2.png"
        alt=""
        aria-hidden="true"
        className="absolute right-[10%] top-0 z-0 w-[65%] md:right-[9%] md:-top-[2%] md:w-[42%]"
      />
      <img
        src="/Palace.png"
        alt="Alila Fort Bishangarh"
        className="absolute bottom-0 left-1/2 z-10 h-[85%] w-auto -translate-x-1/2 md:left-0 md:h-full md:translate-x-0"
      />
      <div className="absolute bottom-[17%] left-0 z-30 aspect-[40/3] w-full overflow-hidden md:bottom-[20%]">
        <img
          src="/Palace-boundary.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  )
}
