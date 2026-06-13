let audioCtx = null
let masterGain = null
let lastPlayTime = 0
const MIN_GAP = 0.04 // seconds

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    masterGain = audioCtx.createGain()
    masterGain.gain.value = 0.7
    masterGain.connect(audioCtx.destination)
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playTone(frequency, duration, type, startTime, volume) {
  const ctx = getAudioContext()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime)

  gain.gain.setValueAtTime(0, ctx.currentTime + startTime)
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + startTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration)

  osc.connect(gain)
  gain.connect(masterGain)

  osc.start(ctx.currentTime + startTime)
  osc.stop(ctx.currentTime + startTime + duration)
}

function canPlay() {
  const now = performance.now() / 1000
  if (now - lastPlayTime < MIN_GAP) return false
  lastPlayTime = now
  return true
}

export function playCorrectSound() {
  try {
    if (!canPlay()) return
    playTone(1000, 0.05, 'square', 0, 0.3)
    playTone(1500, 0.08, 'square', 0.05, 0.3)
  } catch (_) {}
}

export function playWrongSound() {
  try {
    if (!canPlay()) return
    playTone(400, 0.08, 'square', 0, 0.25)
    playTone(300, 0.08, 'square', 0.08, 0.25)
    playTone(200, 0.15, 'square', 0.16, 0.25)
  } catch (_) {}
}