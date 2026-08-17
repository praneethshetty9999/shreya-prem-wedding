import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { WEDDING_COUNTDOWN_TARGET } from '../../lib/constants'

function pad(value) {
  return String(value).padStart(2, '0')
}

function CountdownUnit({ value, label }) {
  return (
    <span>
      {pad(value)}
      <span className="text-cream/60">{label}</span>
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
}

export function HeroSection({ onOpenRsvp = () => {} }) {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_COUNTDOWN_TARGET)

  return (
    <section
      id="hero-section"
      className="relative flex min-h-svh flex-col items-center justify-between overflow-hidden bg-terracotta bg-cover bg-center bg-no-repeat px-6 py-10 text-cream sm:py-14"
      style={{ backgroundImage: "url('/Hero.svg')" }}
    >
      <motion.button
        type="button"
        onClick={onOpenRsvp}
        aria-label="Open RSVP form"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
        className="flex cursor-pointer flex-col items-center gap-8 sm:gap-10 lg:gap-12"
      >
        <img
          src="/Group.svg"
          alt="Save the date, March 3-6 2027"
          className="h-auto w-[190px] sm:w-[220px] lg:w-[251px]"
        />
        <img
          src="/Frame 73.png"
          alt="Click date to RSVP"
          className="h-auto w-[110px] sm:hidden"
        />
      </motion.button>

      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.15}
        variants={fadeUp}
        className="flex h-[260px] w-[260px] items-center justify-center sm:h-[330px] sm:w-[330px] lg:h-[395px] lg:w-[395px]"
      >
        <img src="/Logo.svg" alt="" className="h-full w-full" />
      </motion.div>

      <motion.img
        src="/Group.png"
        alt="Shreya & Prem"
        initial="hidden"
        animate="visible"
        custom={0.22}
        variants={fadeUp}
        className="h-auto w-[190px] sm:hidden"
      />

      <motion.p
        initial="hidden"
        animate="visible"
        custom={0.3}
        variants={fadeUp}
        className="font-timer text-base font-bold tracking-widest text-cream/80 sm:text-lg lg:text-xl"
        aria-label={`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds remaining`}
      >
        <CountdownUnit value={days} label="D" /> <CountdownUnit value={hours} label="H" />{' '}
        <CountdownUnit value={minutes} label="M" /> <CountdownUnit value={seconds} label="S" />
      </motion.p>
    </section>
  )
}
