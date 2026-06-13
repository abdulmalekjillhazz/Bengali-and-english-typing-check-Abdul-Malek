function clickBuffer(ctx, duration, type) {
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i++) {
    // white noise, decaying envelope
    const decay = Math.pow(1 - i / bufferSize, 4)
    data[i] = (Math.random() * 2 - 1) * decay
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = type === 'correct' ? 4000 : 1400
  filter.Q.value = 1.2

  const gain = ctx.createGain()
  gain.gain.value = type === 'correct' ? 0.8 : 0.9

  source.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  source.start()
}

export function playCorrectSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    clickBuffer(ctx, 0.03, 'correct')
  } catch (_) {}
}

export function playWrongSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    clickBuffer(ctx, 0.06, 'wrong')
  } catch (_) {}
}