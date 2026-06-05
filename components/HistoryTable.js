'use client'

import { useState, useMemo } from 'react'
import { formatDate, formatTime } from '../utils/dateUtils'

/**
 * HistoryTable — displays all past test results with:
 *   - Search (by language, WPM, date)
 *   - Column sorting (click any header)
 *   - Per-row delete
 *   - Clear all button
 *   - CSV export button
 */
export default function HistoryTable({ history, onDelete, onClearAll, onExport }) {
  const [search,  setSearch]  = useState('')
  const [sortKey, setSortKey] = useState('timestamp')
  const [sortDir, setSortDir] = useState('desc')

  // Filter + sort the history array
  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim()
    let data = history.filter((r) => {
      if (!s) return true
      return (
        r.language.toLowerCase().includes(s) ||
        String(r.wpm).includes(s) ||
        formatDate(r.timestamp).toLowerCase().includes(s)
      )
    })

    data = [...data].sort((a, b) => {
      const va = a[sortKey]
      const vb = b[sortKey]
      const dir = sortDir === 'asc' ? 1 : -1
      return va < vb ? -dir : va > vb ? dir : 0
    })

    return data
  }, [history, search, sortKey, sortDir])

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('desc') }
  }

  if (!history.length) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--muted)' }}>
        No test history yet. Complete a test to see your results here.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Controls row */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by language, WPM, date..."
          style={{
            flex: 1,
            minWidth: 180,
            padding: '9px 16px',
            borderRadius: 999,
            border: '1.5px solid var(--border)',
            background: 'var(--input-bg)',
            color: 'var(--text)',
            fontSize: 14,
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
        <button onClick={onExport}   style={actionBtn('#6366f1')}>📥 Export CSV</button>
        <button onClick={onClearAll} style={actionBtn('#ef4444')}>🗑️ Clear All</button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 16, border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {[
                { key: 'timestamp', label: 'Date' },
                { key: 'language',  label: 'Lang' },
                { key: 'wpm',       label: 'WPM'  },
                { key: 'cpm',       label: 'CPM'  },
                { key: 'words',     label: 'Words' },
                { key: 'targetWPM', label: 'Target' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  style={{
                    padding: '10px 14px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 700,
                    color: sortKey === key ? 'var(--accent)' : 'var(--muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    background: 'var(--card-bg)',
                    userSelect: 'none',
                  }}
                >
                  {label} {sortKey === key ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
              <th style={{ padding: '10px 14px', background: 'var(--card-bg)' }} />
            </tr>
          </thead>

          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={r.id}
                style={{
                  background: i % 2 === 0 ? 'transparent' : 'rgba(128,128,128,0.04)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {/* Date + time */}
                <td style={{ padding: '10px 14px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {formatDate(r.timestamp)}
                  <br />
                  <span style={{ fontSize: 11 }}>{formatTime(r.timestamp)}</span>
                </td>

                {/* Language */}
                <td style={{ padding: '10px 14px' }}>{r.language}</td>

                {/* WPM — highlighted */}
                <td style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}>
                  {r.wpm}
                </td>

                {/* CPM */}
                <td style={{ padding: '10px 14px', fontFamily: 'DM Mono, monospace' }}>
                  {r.cpm}
                </td>

                {/* Words */}
                <td style={{ padding: '10px 14px', fontFamily: 'DM Mono, monospace' }}>
                  {r.words}
                </td>

                {/* Target — badge showing achieved / not */}
                <td style={{ padding: '10px 14px' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 700,
                    background: r.targetAchieved ? '#10b981' : 'var(--border)',
                    color: r.targetAchieved ? '#fff' : 'var(--muted)',
                  }}>
                    {r.targetWPM} {r.targetAchieved ? '✓' : ''}
                  </span>
                </td>

                {/* Delete button */}
                <td style={{ padding: '10px 14px' }}>
                  <button
                    onClick={() => onDelete(r.id)}
                    title="Delete this record"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ef4444',
                      fontSize: 15,
                      padding: '2px 6px',
                      borderRadius: 6,
                      opacity: 0.7,
                    }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'right' }}>
        Showing {filtered.length} of {history.length} records
      </div>
    </div>
  )
}

function actionBtn(bg) {
  return {
    padding: '9px 18px',
    borderRadius: 999,
    border: 'none',
    background: bg,
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }
}
