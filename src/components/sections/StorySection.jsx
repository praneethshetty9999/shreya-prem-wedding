import { motion } from 'framer-motion'

export function StorySection() {
  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1.6fr_1.7fr_0.9fr] md:gap-6">
      {/* Outer div carries a slow, continuous breathing float once the photo
          has settled in — kept to a couple of pixels so it reads as alive,
          not animated. Delay is timed to start right as the develop-in
          transition below finishes. */}
      <motion.div
        className="order-1 flex items-center justify-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
      >
        {/* mix-blend-multiply melts the photo's white paper edges into the
            beige page texture; no shadow/rounding so no box outline shows.
            Entrance mimics a print developing: desaturated and slightly out
            of focus, sharpening into color as it settles into its tilt.
            Hover straightens it, like it's being lifted off the page. */}
        <motion.img
          src="/Couple-photo.png"
          alt="Shreya and Prem"
          className="h-auto w-full mix-blend-multiply"
          initial={{
            opacity: 0,
            scale: 1.08,
            rotate: -4,
            filter: 'grayscale(1) blur(7px) contrast(0.85)',
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotate: -1.5,
            filter: 'grayscale(0) blur(0px) contrast(1)',
          }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            rotate: 0,
            scale: 1.035,
            filter: 'grayscale(0) blur(0px) contrast(1.05)',
            transition: { duration: 0.4, ease: 'easeOut' },
          }}
        />
      </motion.div>

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
