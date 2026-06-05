/**
 * Count words in a string.
 * Works for both English and Bengali Unicode text.
 * Ignores leading/trailing spaces and multiple spaces.
 */
export function countWords(text) {
  if (!text || !text.trim()) return 0
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length
}

/**
 * Count characters in a string (includes spaces).
 */
export function countChars(text) {
  return text ? text.length : 0
}
