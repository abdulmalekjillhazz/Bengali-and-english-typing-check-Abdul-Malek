'use client'

import StatisticsCard from './StatisticsCard'
import { formatDate, formatTime } from '../utils/dateUtils'

/**
 * ResultCard — shown after each test is completed.
 *
 * Displays:
 *   - All test metrics in a responsive grid
 *   - Target achieved / need improvement badge
 *   - A special golden card if the user set a new personal best
 */
export default function ResultCard({ result, personalBest, isNewPB }) {
  if (!result) return null

  const achieved = result.wpm >= result.targetWPM
  const diff = result.wpm - result.targetWPM

  return (
    <div
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        animation: 'fadeUp 0.4s ease',
      }}
    >
      {/* Header row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>
          Test Results
        </h2>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {isNewPB && (
            <span style={{
              padding: '6px 14px',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              color: '#fff',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
            }}>
              🏆 New Personal Best!
            </span>
          )}
          <span style={{
            padding: '6px 14px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            background: achieved ? '#10b981' : '#5f5950',
            color: '#fff',
          }}>
            {achieved ? '✅ Target Achieved' : '📈 Need Improvement'}
          </span>
        </div>
      </div>

      {/* Metrics grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 14,
      }}>
        <StatisticsCard label="WPM"        value={result.wpm}       accent />
        <StatisticsCard label="CPM"        value={result.cpm} />
        <StatisticsCard label="Words"      value={result.words} />
        <StatisticsCard label="Characters" value={result.chars} />
        <StatisticsCard label="Target WPM" value={result.targetWPM} />
        <StatisticsCard label="Difference" value={`${diff >= 0 ? '+' : ''}${diff}`} />
        <StatisticsCard
          label="Duration"
          value={`${Math.floor(result.duration / 60)}:${String(result.duration % 60).padStart(2, '0')}`}
        />
        <StatisticsCard label="Language"   value={result.language} />
      </div>

      {/* Timestamp */}
      <div style={{
        fontSize: 13,
        color: 'var(--muted)',
        borderTop: '1px solid var(--border)',
        paddingTop: 14,
      }}>
        Completed on {formatDate(result.timestamp)} at {formatTime(result.timestamp)}
      </div>

      {/* New personal best celebration card */}
      {isNewPB && (
        <div style={{
          padding: 24,
          borderRadius: 16,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(249,115,22,0.12))',
          border: '1px solid rgba(245,158,11,0.35)',
          animation: 'pulse 1.5s ease-in-out 3',
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏆</div>
          <div style={{ fontWeight: 800, fontSize: 20, color: 'var(--text)' }}>
            New Personal Best: {result.wpm} WPM
          </div>
          <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 6 }}>
            You broke your record! Keep pushing.
          </div>
        </div>
      )}
    </div>
  )
}
