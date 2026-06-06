'use client'

import { useState, useEffect, useCallback } from 'react'
import englishTexts from '../data/englishTexts'
import bengaliTexts from '../data/bengaliTexts'

import Navbar          from './Navbar'
import SettingsPanel   from './SettingsPanel'
import CountdownTimer  from './CountdownTimer'
import TypingArea      from './TypingArea'
import ResultCard      from './ResultCard'
import StatsDashboard  from './StatsDashboard'
import HistoryTable    from './HistoryTable'
import Toast           from './Toast'

import { useLocalStorage }  from '../hooks/useLocalStorage'
import { useDarkMode }      from '../hooks/useDarkMode'
import { useTimer }         from '../hooks/useTimer'
import { useTypingStats }   from '../hooks/useTypingStats'
import { useToast }         from '../hooks/useToast'

import { countWords, countChars } from '../utils/textUtils'
import { calculateWPM, calculateCPM } from '../utils/calcUtils'
import { exportToCSV }   from '../utils/exportUtils'
import { playCompletionSound } from '../utils/soundUtils'

// ── Helper: random item from array ──────────────────────────────────────────
function getRandomText(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function TypingApp() {

  const [targetText, setTargetText] = useState('')

  // ── Persisted state ──────────────────────────────────────────────
  const [history,       setHistory]      = useLocalStorage('tst_history', [])
  const [personalBest,  setPersonalBest] = useLocalStorage('tst_personal_best', 0)
  const [dark,          setDark]         = useDarkMode()

  // ── Settings ─────────────────────────────────────────────────────
  const [lang,           setLang]           = useState('English')
  const [duration,       setDuration]       = useState(60)
  const [targetWPM,      setTargetWPM]      = useState(30)
  const [customDuration, setCustomDuration] = useState('')
  const [customTarget,   setCustomTarget]   = useState('')

  // ── Test state ───────────────────────────────────────────────────
  const [phase,    setPhase]    = useState('idle')
  const [text,     setText]     = useState('')
  const [elapsed,  setElapsed]  = useState(0)
  const [result,   setResult]   = useState(null)
  const [isNewPB,  setIsNewPB]  = useState(false)

  // ── Notifications ────────────────────────────────────────────────
  const { toasts, add: toast, remove: removeToast } = useToast()

  // ── Live typing stats ────────────────────────────────────────────
  const liveStats = useTypingStats(text, elapsed)

  // ── Load a random target text whenever lang changes ──────────────
  useEffect(() => {
    const texts = lang === 'বাংলা' ? bengaliTexts : englishTexts
    setTargetText(getRandomText(texts))
  }, [lang])

  // ── Timer callbacks ──────────────────────────────────────────────
  const handleTick = useCallback((rem) => {
    setElapsed(duration - rem)
  }, [duration])

  const handleComplete = useCallback(() => {
    endTest(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { remaining, running, start, stop, reset } = useTimer(
    duration,
    handleTick,
    handleComplete
  )

useEffect(() => {
  if (running) setElapsed(duration - remaining)
}, [remaining, running, duration])

// text শেষ হলে নতুন random text লোড করো
useEffect(() => {
  if (!targetText || phase !== 'running') return

  const normalizedTarget = targetText.normalize('NFC')
  const normalizedTyped  = text.normalize('NFC')

  const targetChars = [...normalizedTarget]
  const typedChars  = [...normalizedTyped]

  if (typedChars.length >= targetChars.length) {
    const texts = lang === 'বাংলা' ? bengaliTexts : englishTexts
    let newText = getRandomText(texts)

    while (newText === targetText && texts.length > 1) {
      newText = getRandomText(texts)
    }

    setTargetText(newText)
    setText('')
    toast('নতুন text এলো! চালিয়ে যাও...', 'info', '🔄')
  }
}, [text, targetText, phase, lang])

  // ── Core test actions ────────────────────────────────────────────

  function finalizeTest(remSeconds) {
    const words = countWords(text)
    const chars = countChars(text)
    const usedSeconds = Math.max(duration - remSeconds, 1)
    const wpm = calculateWPM(words, usedSeconds)
    const cpm = calculateCPM(chars, usedSeconds)
    const targetAchieved = wpm >= targetWPM
    const newPB = wpm > (personalBest || 0)

    const record = {
      id:             Date.now(),
      timestamp:      Date.now(),
      language:       lang,
      duration:       duration,
      words,
      chars,
      wpm,
      cpm,
      targetWPM,
      targetAchieved,
    }

    setResult(record)
    setPhase('done')
    setHistory((prev) => [record, ...prev])

    if (newPB) {
      setPersonalBest(wpm)
      setIsNewPB(true)
      toast('🏆 New Personal Best!', 'success')
    } else {
      setIsNewPB(false)
    }

    playCompletionSound()
    toast('Test completed!', 'success', '✅')
    if (targetAchieved) toast(`Target ${targetWPM} WPM achieved!`, 'success', '🎯')
  }

  function endTest(remSeconds) {
    stop()
    finalizeTest(remSeconds)
  }

  function handleStart() {
    // প্রতিবার Start করলে নতুন random text লোড হবে
    const texts = lang === 'বাংলা' ? bengaliTexts : englishTexts
    setTargetText(getRandomText(texts))

    reset(duration)
    setText('')
    setElapsed(0)
    setResult(null)
    setIsNewPB(false)
    setPhase('running')
    setTimeout(() => start(), 50)
    toast('Test started! Type now.', 'info', '⌨️')
  }

  function handleStop() {
    endTest(remaining)
  }

  // ── Keyboard shortcuts ───────────────────────────────────────────
  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        if (phase === 'idle' || phase === 'done') handleStart()
      }
      if (e.key === 'Escape' && phase === 'running') {
        handleStop()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, remaining])

  // ── History actions ──────────────────────────────────────────────
  function handleDelete(id) {
    setHistory((prev) => prev.filter((r) => r.id !== id))
  }

  function handleClearAll() {
    setHistory([])
    toast('History cleared.', 'info', '🗑️')
  }

  function handleExport() {
    exportToCSV(history)
    toast('CSV exported.', 'success', '📥')
  }

  // ── Derived flags ────────────────────────────────────────────────
  const isRunning  = phase === 'running'
  const isDisabled = !isRunning

  // ── Render ───────────────────────────────────────────────────────
  return (
    <>
      <Toast toasts={toasts} removeToast={removeToast} />

      <Navbar dark={dark} setDark={setDark} />

      <main style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: '32px 20px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
      }}>

        {/* ── Settings + Timer row ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isRunning ? '1fr auto' : '1fr',
          gap: 24,
          alignItems: 'start',
        }}>
          <div style={card}>
            <h2 style={sectionTitle}>Settings</h2>
            <SettingsPanel
              lang={lang}                   setLang={setLang}
              duration={duration}           setDuration={setDuration}
              targetWPM={targetWPM}         setTargetWPM={setTargetWPM}
              customDuration={customDuration} setCustomDuration={setCustomDuration}
              customTarget={customTarget}   setCustomTarget={setCustomTarget}
              disabled={isRunning}
            />
          </div>

          {isRunning && (
            <div style={{ ...card, minWidth: 190 }}>
              <CountdownTimer remaining={remaining} total={duration} />
            </div>
          )}
        </div>

        {/* ── Typing area ── */}
        <div style={card}>
          <TypingArea
            value={text}
            onChange={setText}
            disabled={isDisabled}
            language={lang}
            liveStats={liveStats}
            targetText={targetText} 
          />

          {/* Start / Stop button */}
          <div style={{ display: 'flex', gap: 12, marginTop: 20, justifyContent: 'center' }}>
            {!isRunning ? (
              <button
                onClick={handleStart}
                style={{
                  ...primaryBtn('#6366f1'),
                  animation: 'pulse 2s ease-in-out infinite',
                  boxShadow: '0 4px 24px rgba(99,102,241,0.35)',
                }}
              >
                ▶ Start Test
              </button>
            ) : (
              <button onClick={handleStop} style={primaryBtn('#ef4444')}>
                ■ Stop Test
              </button>
            )}
          </div>

          {/* Keyboard hint */}
          <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, marginTop: 10 }}>
            {!isRunning
              ? <><Kbd>Ctrl+Enter</Kbd> চাপুন শুরু করতে</>
              : <><Kbd>Esc</Kbd> চাপুন বন্ধ করতে</>
            }
          </p>
        </div>

        {/* ── Results ── */}
        {result && (
          <ResultCard
            result={result}
            personalBest={personalBest}
            isNewPB={isNewPB}
          />
        )}

        {/* ── Statistics dashboard ── */}
        {history.length > 0 && (
          <div style={card}>
            <StatsDashboard history={history} personalBest={personalBest} />
          </div>
        )}

        {/* ── History table ── */}
        <div style={card}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>
            Test History
          </h2>
          <HistoryTable
            history={history}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
            onExport={handleExport}
          />
        </div>

      </main>
    </>
  )
}

// ── Shared style objects ─────────────────────────────────────────────────────

const card = {
  background: 'var(--card-bg)',
  border: '1px solid var(--border)',
  borderRadius: 20,
  padding: 28,
}

const sectionTitle = {
  margin: '0 0 20px',
  fontSize: 13,
  fontWeight: 700,
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
}

function primaryBtn(bg) {
  return {
    padding: '14px 44px',
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 999,
    border: 'none',
    background: bg,
    color: '#fff',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'opacity 0.15s',
  }
}

function Kbd({ children }) {
  return (
    <kbd style={{
      background: 'var(--border)',
      padding: '2px 7px',
      borderRadius: 5,
      fontSize: 11,
      fontFamily: 'DM Mono, monospace',
    }}>
      {children}
    </kbd>
  )
}