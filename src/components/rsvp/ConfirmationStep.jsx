import { motion } from 'framer-motion'
import { ArrowRightIcon } from './icons'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: 'easeOut' },
  }),
}

export function ConfirmationStep({ onBack }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative flex min-h-svh flex-col items-center justify-center gap-6 bg-cover bg-center px-6 py-12 text-center"
      style={{ backgroundImage: "url('/rsvp-background.png')" }}
    >
      <motion.img
        initial="hidden"
        animate="visible"
        custom={0.15}
        variants={fadeUp}
        src="/save-the-date.png"
        alt="Save the date! March 3-6, 2027"
        className="w-72 sm:w-[28rem]"
      />

      <motion.img
        initial="hidden"
        animate="visible"
        custom={0.35}
        variants={fadeUp}
        src="/welcome-dog.png"
        alt="Two dog illustrations saying you're woofcome!"
        className="w-64 sm:w-80"
      />

      <motion.button
        initial="hidden"
        animate="visible"
        custom={0.55}
        variants={fadeUp}
        type="button"
        onClick={onBack}
        className="font-label mt-6 flex items-center gap-2 rounded-full border border-[#E0492B] px-7 py-2 text-lg text-[#E0492B] transition-colors hover:bg-[#E0492B]/10"
      >
        Done
        <ArrowRightIcon className="h-5 w-5" />
      </motion.button>
    </motion.section>
  )
}
