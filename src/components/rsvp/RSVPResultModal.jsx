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
  const isOpen = step !== 'NAME_ENTRY'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
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
            className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border-2 border-terracotta bg-parchment p-8 text-center shadow-2xl"
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
              className="font-label mt-6 text-sm tracking-widest text-terracotta/60 underline"
            >
              close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
