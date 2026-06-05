/**
 * Calculate Words Per Minute.
 * @param {number} words - total words typed
 * @param {number} seconds - time elapsed in seconds
 */
export function calculateWPM(words, seconds) {
  if (!seconds || seconds <= 0) return 0
  const minutes = seconds / 60
  return Math.round(words / minutes)
}

/**
 * Calculate Characters Per Minute.
 * @param {number} chars - total characters typed
 * @param {number} seconds - time elapsed in seconds
 */
export function calculateCPM(chars, seconds) {
  if (!seconds || seconds <= 0) return 0
  const minutes = seconds / 60
  return Math.round(chars / minutes)
}
