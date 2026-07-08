import { AnimatePresence, motion } from 'framer-motion'
import { GuestDetailsStep } from './GuestDetailsStep'
import { NameSelectStep } from './NameSelectStep'

export function RSVPResultModal({
  step,
  matches,
  selectedName,
  onSelectName,
  onResetName,
  onSubmitDetails,
  isSubmitting,
  submitError,
  onClose,
}) {
  const isOpen = step === 'SELECT_NAME' || step === 'GUEST_DETAILS'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#3a1d10]/30 p-4 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-3xl border border-vermillion bg-rsvp-cream bg-cover bg-center p-8 text-center shadow-2xl"
            style={{ backgroundImage: "url('/rsvp-background.png')" }}
          >
            {step === 'SELECT_NAME' && (
              <NameSelectStep matches={matches} onSelect={onSelectName} />
            )}
            {step === 'GUEST_DETAILS' && (
              <GuestDetailsStep
                guestName={selectedName}
                onReset={onResetName}
                onSubmit={onSubmitDetails}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}
            <button
              type="button"
              onClick={onClose}
              className="font-label mx-auto mt-6 flex items-center gap-1.5 text-base text-terracotta underline underline-offset-2"
            >
              <span aria-hidden="true" className="no-underline">
                ✕
              </span>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
