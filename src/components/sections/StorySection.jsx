export function StorySection() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1.6fr_1.7fr_0.9fr] md:gap-6">
      <div className="order-1 flex h-full items-center justify-center">
        <img
          src="/Couple-photo.png"
          alt="Shreya and Prem"
          className="h-full w-full rounded-lg object-cover shadow-lg"
        />
      </div>

      <div className="order-2 flex h-full flex-col justify-center text-center font-semibold text-maroon md:text-left">
        <p className="leading-relaxed">
          We are so happy you're here. From the very beginning, we knew our wedding would be more than a celebration of the two of us it's a celebration of everyone who has shaped the life we're building together. That's you.
        </p>
        <p className="mt-4 leading-relaxed">
          This next chapter feels like a natural continuation of something we've already been building, full of love, laughter, and the occasional happy chaos. As we look ahead to this milestone, we find ourselves thinking about the people who have made our journey what it is the friends and family who have shown up for us, believed in us, and helped us become who we are.
        </p>
        <p className="mt-4 leading-relaxed">
          Whether you've known us for years or are just getting to know us, your presence in our lives means more than words can capture. We would be honored to have you with us as we celebrate this day, surrounded by the people who matter most.
        </p>
        <p className="mt-4 leading-relaxed">
          Thank you for being part of our story. We can't wait to celebrate with you.
        </p>
        <p className="mt-4 leading-relaxed">
          With so much love,
          Prem & Shreya
        </p>
      </div>

      <div className="order-3 flex h-full items-center justify-center">
        <img src="/Flower.png" alt="" aria-hidden="true" className="w-4/5 md:w-full" />
      </div>
    </div>
  )
}
