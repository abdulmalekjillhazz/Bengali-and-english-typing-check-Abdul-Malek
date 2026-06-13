function playTone(ctx, frequency, duration, type, startTime, volume) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime)

  gain.gain.setValueAtTime(0, ctx.currentTime + startTime)
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + startTime + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime + startTime)
  osc.stop(ctx.currentTime + startTime + duration)
}

export function playCorrectSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    // আর্কেড পপ - দুটো sharp square নোট
    playTone(ctx, 1000, 0.05, 'square', 0, 0.15)
    playTone(ctx, 1500, 0.08, 'square', 0.05, 0.15)
  } catch (_) {}
}

export function playWrongSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    // আর্কেড ফেইল - নিচের দিকে নামতে থাকা ৩টা square নোট
    playTone(ctx, 400, 0.08, 'square', 0, 0.25)
    playTone(ctx, 300, 0.08, 'square', 0.08, 0.25)
    playTone(ctx, 200, 0.15, 'square', 0.16, 0.25)
  } catch (_) {}
}