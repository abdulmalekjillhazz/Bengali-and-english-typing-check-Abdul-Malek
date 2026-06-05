'use client'

import { useMemo } from 'react'
import StatisticsCard from './StatisticsCard'

/**
 * StatsDashboard — aggregates the entire test history into summary cards.
 *
 * Shows: Best WPM, Average WPM, Total Tests, Total Words, Total Chars,
 *        Targets Hit, Success Rate, Best Achievement Streak.
 */
export default function StatsDashboard({ history, personalBest }) {
  const stats = useMemo(() => {
    if (!history.length) return null

    const totalTests  = history.length
    const totalWords  = history.reduce((s, r) => s + r.words, 0)
    const totalChars  = history.reduce((s, r) => s + r.chars, 0)
    const avgWPM      = Math.round(history.reduce((s, r) => s + r.wpm, 0) / totalTests)
    const achieved    = history.filter((r) => r.targetAchieved).length
    const successRate = Math.round((achieved / totalTests) * 100)

    // Calculate the best consecutive streak of targets achieved
    // (history is stored newest-first, so we reverse to go oldest-first)
    let streak = 0
    let bestStreak = 0
    ;[...history].reverse().forEach((r) => {
      if (r.targetAchieved) {
        streak++
        bestStreak = Math.max(bestStreak, streak)
      } else {
        streak = 0
      }
    })

    return { totalTests, totalWords, totalChars, avgWPM, achieved, successRate, bestStreak }
  }, [history])

  if (!stats) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>
        Statistics
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
        gap: 14,
      }}>
        <StatisticsCard label="Personal Best"  value={personalBest || 0} sub="WPM" accent />
        <StatisticsCard label="Average WPM"    value={stats.avgWPM} />
        <StatisticsCard label="Total Tests"    value={stats.totalTests} />
        <StatisticsCard label="Total Words"    value={stats.totalWords.toLocaleString()} />
        <StatisticsCard label="Total Chars"    value={stats.totalChars.toLocaleString()} />
        <StatisticsCard label="Targets Hit"    value={stats.achieved} />
        <StatisticsCard label="Success Rate"   value={`${stats.successRate}%`} />
        <StatisticsCard label="Best Streak"    value={stats.bestStreak} sub="consecutive" />
      </div>
    </div>
  )
}
