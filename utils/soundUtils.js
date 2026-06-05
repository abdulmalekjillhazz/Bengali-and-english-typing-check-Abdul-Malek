/**
 * Play a short ascending chime using the Web Audio API.
 * No external file needed — generates sound programmatically.
 */
export function playCompletionSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const notes = [523.25, 659.25, 783.99, 1046.5]

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.frequency.value = freq
      osc.type = 'sine'

      const start = ctx.currentTime + i * 0.13
      gain.gain.setValueAtTime(0.18, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35)

      osc.start(start)
      osc.stop(start + 0.35)
    })
  } catch (_) {
    // Silently fail if Web Audio API is unavailable
  }
}
