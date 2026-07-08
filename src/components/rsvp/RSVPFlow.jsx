import { AnimatePresence } from 'framer-motion'
import Fuse from 'fuse.js'
import { useState } from 'react'
import { useGuestList } from '../../hooks/useGuestList'
import { submitRsvp } from '../../lib/api'
import { ConfirmationStep } from './ConfirmationStep'
import { NameEntryStep } from './NameEntryStep'
import { RSVPResultModal } from './RSVPResultModal'

const STEPS = {
  NAME_ENTRY: 'NAME_ENTRY',
  SELECT_NAME: 'SELECT_NAME',
  GUEST_DETAILS: 'GUEST_DETAILS',
  CONFIRMATION: 'CONFIRMATION',
}

export function RSVPFlow({ onBack }) {
  const { waitForGuestList } = useGuestList()
  const [step, setStep] = useState(STEPS.NAME_ENTRY)
  const [nameInput, setNameInput] = useState('')
  const [matchedNames, setMatchedNames] = useState([])
  const [selectedName, setSelectedName] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleNameSubmit() {
    const trimmed = nameInput.trim()
    if (trimmed.length < 2) return
    // Await the fetch itself rather than reading guestList state, since a
    // guest can submit before the initial fetch has settled (slow network,
    // cold Worker start) — searching the not-yet-populated state would
    // wrongly report "no match" even for an invited guest.
    const list = await waitForGuestList()
    const fuse = new Fuse(list, { keys: ['name'], threshold: 0.4 })
    setMatchedNames(fuse.search(trimmed).map((result) => result.item.name))
    setSelectedName(null)
    setStep(STEPS.SELECT_NAME)
  }

  function handleSelectName(name) {
    setSelectedName(name)
    setStep(STEPS.GUEST_DETAILS)
  }

  async function handleDetailsSubmit(details) {
    setIsSubmitting(true)
    setSubmitError('')
    try {
      await submitRsvp({ name: selectedName, ...details })
      setStep(STEPS.CONFIRMATION)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* mode="wait": on submit the modal fades out and the name-entry page
          finishes its exit fade before the confirmation page fades in — a
          smooth handoff instead of a hard swap. */}
      <AnimatePresence mode="wait">
        {step === STEPS.CONFIRMATION ? (
          <ConfirmationStep key="confirmation" onBack={onBack} />
        ) : (
          <NameEntryStep
            key="name-entry"
            value={nameInput}
            onChange={setNameInput}
            onSubmit={handleNameSubmit}
            onBack={onBack}
          />
        )}
      </AnimatePresence>

      <RSVPResultModal
        step={step}
        matches={matchedNames}
        selectedName={selectedName}
        onSelectName={handleSelectName}
        onResetName={() => {
          setSelectedName(null)
          setStep(STEPS.SELECT_NAME)
        }}
        onSubmitDetails={handleDetailsSubmit}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onClose={() => setStep(STEPS.NAME_ENTRY)}
      />
    </>
  )
}
