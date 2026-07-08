export function StorySection() {
  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.6fr_1.7fr_0.9fr] md:gap-6">
      <div className="order-1 flex items-center justify-center">
        {/* mix-blend-multiply melts the photo's white paper edges into the
            beige page texture; no shadow/rounding so no box outline shows. */}
        <img
          src="/Couple-photo.png"
          alt="Shreya and Prem"
          className="h-auto w-full mix-blend-multiply"
        />
      </div>

      {/* Figma: DIN Bold 16px / 0% letter-spacing, line-height bumped to 115%
          per feedback, color #B70000, one-line paragraph gaps, two-line sign-off. */}
      <div className="font-heading order-2 text-center text-base font-bold leading-[1.3] text-[#B70000] md:text-left">
        <p>
          We are so happy you're here. From the very beginning, we knew our wedding would be more than a celebration of the two of us it's a celebration of everyone who has shaped the life we're building together. That's you.
        </p>
        <p className="mt-4">
          This next chapter feels like a natural continuation of something we've already been building, full of love, laughter, and the occasional happy chaos. As we look ahead to this milestone, we find ourselves thinking about the people who have made our journey what it is the friends and family who have shown up for us, believed in us, and helped us become who we are.
        </p>
        <p className="mt-4">
          Whether you've known us for years or are just getting to know us, your presence in our lives means more than words can capture. We would be honored to have you with us as we celebrate this day, surrounded by the people who matter most.
        </p>
        <p className="mt-4">
          Thank you for being part of our story. We can't wait to celebrate with you.
        </p>
        <p className="mt-4">
          With so much love,
          <br />
          Prem &amp; Shreya
        </p>
      </div>

      <div className="order-3 flex items-center justify-center md:-ml-4 md:justify-start">
        <img src="/Flower.png" alt="" aria-hidden="true" className="w-[9.5rem] md:w-[12rem] lg:w-[15.5rem]" />
      </div>
    </div>
  )
}
