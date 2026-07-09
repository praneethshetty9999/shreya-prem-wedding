const STORAGE_KEY = 'shreyaprem_authed'

// One shared password gates every page but the landing page itself. The
// unlock persists in sessionStorage so a refresh doesn't re-prompt within the
// same browser tab session, but closing the tab does.
export function isSiteUnlocked() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function unlockSite() {
  try {
    sessionStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // sessionStorage unavailable (e.g. private browsing) — auth just won't persist.
  }
}
