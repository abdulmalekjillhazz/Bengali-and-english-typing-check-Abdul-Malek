import { useMemo } from 'react'
import { countWords, countChars } from '../utils/textUtils'
import { calculateWPM, calculateCPM } from '../utils/calcUtils'

/**
 * Calculates live typing statistics from the current text and elapsed time.
 * totalWords / totalChars = আগের সব text এর জমানো হিসাব
 *
 * @param {string} text           - current text in the typing area
 * @param {number} elapsedSeconds - how many seconds have passed
 * @param {number} totalWords     - words from previously completed texts
 * @param {number} totalChars     - chars from previously completed texts
 */
export function useTypingStats(text, elapsedSeconds, totalWords = 0, totalChars = 0) {
  return useMemo(() => {
    const currentWords = countWords(text)
    const currentChars = countChars(text)

    // আগের সব text + এখনকার text মিলিয়ে মোট
    const words = totalWords + currentWords
    const chars = totalChars + currentChars

    // মোট words/chars দিয়ে WPM/CPM calculate করো
    const wpm = calculateWPM(words, elapsedSeconds)
    const cpm = calculateCPM(chars, elapsedSeconds)

    return { words, chars, wpm, cpm }
  }, [text, elapsedSeconds, totalWords, totalChars])
}