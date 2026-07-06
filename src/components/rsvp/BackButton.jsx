import { ArrowLeftIcon } from './icons'

export function BackButton({ onClick, label = 'back' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Go back"
      className="absolute left-6 top-6 z-10 flex items-center gap-2 text-cream/80 transition-colors hover:text-cream"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      <span className="font-label text-sm tracking-widest">{label}</span>
    </button>
  )
}
