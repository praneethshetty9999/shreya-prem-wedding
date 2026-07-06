import { motion } from 'framer-motion'
import { useCountdown } from '../../hooks/useCountdown'
import { COUPLE, SAVE_THE_DATE_RANGE, WEDDING_COUNTDOWN_TARGET } from '../../lib/constants'
import { PetalShower } from '../ui/PetalShower'

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
      className="relative flex min-h-[72svh] flex-col items-center justify-center gap-6 overflow-hidden bg-terracotta bg-cover bg-center px-6 py-8 text-cream sm:gap-8 sm:py-10"
      style={{ backgroundImage: "url('/rust-background.png')" }}
    >
      <PetalShower />

      <motion.button
        type="button"
        onClick={onOpenRsvp}
        aria-label="Open RSVP form"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
        className="cursor-pointer text-center"
      >
        <h1 className="font-heading text-xl font-bold tracking-wide text-heading sm:text-3xl lg:text-5xl">
          SAVE THE DATE
        </h1>
        <p className="font-heading mt-2 text-base font-bold tracking-wide text-heading sm:text-xl lg:text-3xl">
          {SAVE_THE_DATE_RANGE}
        </p>
      </motion.button>

      {/* Mobile: logo alone, centered */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.15}
        variants={fadeUp}
        className="relative flex h-[288px] w-[288px] items-center justify-center rounded-full shadow-lg sm:hidden"
      >
        <img src="/Logo.png" alt="" className="h-full w-full" />
      </motion.div>

      {/* Desktop: click date / to RSVP pinned to the logo's top edge, SHREYA / PREM pinned to its bottom edge */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.15}
        variants={fadeUp}
        className="relative mx-auto hidden h-[383px] w-full max-w-5xl sm:block lg:h-[430px]"
      >
        <span className="font-label absolute left-0 top-0 text-xl tracking-widest text-label lg:text-2xl">
          click date
        </span>
        <span className="font-label absolute right-0 top-0 text-right text-xl tracking-widest text-label lg:text-2xl">
          to RSVP
        </span>

        <div className="absolute left-1/2 top-0 h-full w-[383px] -translate-x-1/2 rounded-full shadow-lg lg:w-[430px]">
          <img src="/Logo.png" alt="" className="h-full w-full" />
        </div>

        <h2 className="font-heading absolute bottom-[3%] left-0 text-3xl uppercase text-heading lg:text-6xl">
          {COUPLE.partnerOne}
        </h2>
        <h2 className="font-heading absolute bottom-[3%] right-0 text-right text-3xl uppercase text-heading lg:text-6xl">
          {COUPLE.partnerTwo}
        </h2>
      </motion.div>

      {/* Mobile: Shreya & Prem as one combined line */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={0.3}
        variants={fadeUp}
        className="flex items-center justify-center gap-3 sm:hidden"
      >
        <h2 className="font-heading text-3xl uppercase text-heading">{COUPLE.partnerOne}</h2>
        <span aria-hidden="true" className="font-heading text-2xl text-heading">
          &amp;
        </span>
        <h2 className="font-heading text-3xl uppercase text-heading">{COUPLE.partnerTwo}</h2>
      </motion.div>

      <motion.p
        initial="hidden"
        animate="visible"
        custom={0.45}
        variants={fadeUp}
        className="font-timer text-base tracking-widest text-cream/80 sm:text-lg lg:text-xl"
        aria-label={`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds remaining`}
      >
        <CountdownUnit value={days} label="D" /> <CountdownUnit value={hours} label="H" />{' '}
        <CountdownUnit value={minutes} label="M" /> <CountdownUnit value={seconds} label="S" />
      </motion.p>

      <motion.button
        type="button"
        onClick={onOpenRsvp}
        initial="hidden"
        animate="visible"
        custom={0.6}
        variants={fadeUp}
        className="font-label text-xl tracking-widest text-label sm:hidden"
      >
        click date to RSVP
      </motion.button>
    </section>
  )
}
