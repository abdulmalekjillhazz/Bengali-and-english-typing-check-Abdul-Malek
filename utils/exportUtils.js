import { formatDate, formatTime } from './dateUtils'

/**
 * Export an array of history records as a CSV file download.
 * @param {Array} history - array of test result objects
 */
export function exportToCSV(history) {
  const headers = [
    'Date',
    'Time',
    'Language',
    'Duration (s)',
    'Words',
    'Characters',
    'WPM',
    'CPM',
    'Target WPM',
    'Target Status',
  ]

  const rows = history.map((r) => [
    formatDate(r.timestamp),
    formatTime(r.timestamp),
    r.language,
    r.duration,
    r.words,
    r.chars,
    r.wpm,
    r.cpm,
    r.targetWPM,
    r.targetAchieved ? 'Achieved' : 'Not Achieved',
  ])

  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `typing_history_${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
