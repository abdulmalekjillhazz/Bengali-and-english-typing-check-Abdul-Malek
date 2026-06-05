/**
 * Format a timestamp into a readable date string.
 * e.g. "05 Jun 2026"
 */
export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format a timestamp into a readable time string.
 * e.g. "14:35"
 */
export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
