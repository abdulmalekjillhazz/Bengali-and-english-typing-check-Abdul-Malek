import { create } from 'zustand'

const useTypingStore = create((set, get) => ({

  // ── Settings ────────────────────────────────────────────────────
  lang:       'English',
  duration:   60,
  targetWPM:  30,

  // ── Test state ───────────────────────────────────────────────────
  phase:      'idle',   // 'idle' | 'running' | 'done'
  text:       '',
  elapsed:    0,
  result:     null,
  isNewPB:    false,
  targetText: '',

  // ── Cumulative stats ─────────────────────────────────────────────
  totalWords: 0,
  totalChars: 0,

  // ── Settings actions ─────────────────────────────────────────────
  setLang:      (lang)      => set({ lang }),
  setDuration:  (duration)  => set({ duration }),
  setTargetWPM: (targetWPM) => set({ targetWPM }),
  setTargetText:(targetText)=> set({ targetText }),

  // ── Test actions ─────────────────────────────────────────────────
  setText:    (text)    => set({ text }),
  setElapsed: (elapsed) => set({ elapsed }),
  setPhase:   (phase)   => set({ phase }),
  setResult:  (result)  => set({ result }),
  setIsNewPB: (isNewPB) => set({ isNewPB }),

  // ── Cumulative stats actions ─────────────────────────────────────
  addWords: (n) => set((s) => ({ totalWords: s.totalWords + n })),
  addChars: (n) => set((s) => ({ totalChars: s.totalChars + n })),

  // ── Reset (নতুন test শুরুতে) ─────────────────────────────────────
  resetStats: () => set({
    text:       '',
    elapsed:    0,
    result:     null,
    isNewPB:    false,
    totalWords: 0,
    totalChars: 0,
    phase:      'idle',
  }),

  // ── Getters (সরাসরি store থেকে সব value নেওয়া) ──────────────────
  getLang:      () => get().lang,
  getDuration:  () => get().duration,
  getTargetWPM: () => get().targetWPM,
  getText:      () => get().text,
  getElapsed:   () => get().elapsed,
  getTotalWords:() => get().totalWords,
  getTotalChars:() => get().totalChars,

}))

export default useTypingStore