import { useMemo } from 'react'
import { countWords, countChars } from '../utils/textUtils'
import { calculateWPM, calculateCPM } from '../utils/calcUtils'

/**
 * Calculates live typing statistics from the current text and elapsed time.
 * Uses useMemo so it only recalculates when text or elapsed seconds change.
 *
 * @param {string} text - current text in the typing area
 * @param {number} elapsedSeconds - how many seconds have passed since the test started
 */
export function useTypingStats(text, elapsedSeconds) {
  return useMemo(() => {
    const words = countWords(text)
    const chars = countChars(text)
    const wpm = calculateWPM(words, elapsedSeconds)
    const cpm = calculateCPM(chars, elapsedSeconds)
    return { words, chars, wpm, cpm }
  }, [text, elapsedSeconds])
}
