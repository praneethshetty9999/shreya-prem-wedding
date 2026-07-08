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
      className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-terracotta bg-cover bg-center px-6 py-8 text-cream sm:gap-8 sm:py-10"
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
        {/* Figma: DIN Bold 39.53px / 100% line-height / 1% letter-spacing */}
        <h1 className="font-heading text-xl font-bold leading-none tracking-[0.01em] text-heading sm:text-3xl lg:text-[39.53px]">
          SAVE THE DATE
        </h1>
        {/* Figma: DIN Bold 32px / 100% / 0% */}
        <p className="font-heading mt-2 text-base font-bold leading-none text-heading sm:text-xl lg:text-[32px]">
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
        {/* Figma: Source Code Pro Medium 24.06px / 100% / 0% */}
        <span className="font-label absolute left-0 top-0 text-xl font-medium leading-none text-label lg:text-[24.06px]">
          click date
        </span>
        <span className="font-label absolute right-0 top-0 text-right text-xl font-medium leading-none text-label lg:text-[24.06px]">
          to RSVP
        </span>

        <div className="absolute left-1/2 top-0 h-full w-[383px] -translate-x-1/2 rounded-full shadow-lg lg:w-[430px]">
          <img src="/Logo.png" alt="" className="h-full w-full" />
        </div>

        {/* Figma: DIN Bold 55.04px / 100% / 0% */}
        <h2 className="font-heading absolute bottom-[3%] left-0 text-3xl font-bold leading-none uppercase text-[#F4EEDB] lg:text-[55.04px]">
          {COUPLE.partnerOne}
        </h2>
        <h2 className="font-heading absolute bottom-[3%] right-0 text-right text-3xl font-bold leading-none uppercase text-[#F4EEDB] lg:text-[55.04px]">
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
        <h2 className="font-heading text-3xl font-bold uppercase text-[#F4EEDB]">
          {COUPLE.partnerOne}
        </h2>
        <span aria-hidden="true" className="font-heading text-2xl font-bold text-[#F4EEDB]">
          &amp;
        </span>
        <h2 className="font-heading text-3xl font-bold uppercase text-[#F4EEDB]">
          {COUPLE.partnerTwo}
        </h2>
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
        className="font-label text-xl font-medium leading-none text-label sm:hidden"
      >
        click date to RSVP
      </motion.button>
    </section>
  )
}
