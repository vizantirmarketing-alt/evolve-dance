function monthAbbrevUpper(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

function dayNum(d: Date): string {
  return String(d.getDate())
}

/**
 * Event list date display: single day as { month, day } or a compact range string.
 */
export function formatEventDateBlock(
  startDate: string,
  endDate?: string | null,
): { month: string; day: string } | { range: string } {
  const start = new Date(startDate)
  if (Number.isNaN(start.getTime())) {
    return { month: '?', day: '?' }
  }

  if (endDate == null || endDate === '') {
    return { month: monthAbbrevUpper(start), day: dayNum(start) }
  }

  const end = new Date(endDate)
  if (Number.isNaN(end.getTime())) {
    return { month: monthAbbrevUpper(start), day: dayNum(start) }
  }

  const sameCalendarDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()

  if (sameCalendarDay) {
    return { month: monthAbbrevUpper(start), day: dayNum(start) }
  }

  const startM = monthAbbrevUpper(start)
  const endM = monthAbbrevUpper(end)
  const startD = start.getDate()
  const endD = end.getDate()

  if (startM === endM) {
    return { range: `${startM} ${startD}–${endD}` }
  }

  return { range: `${startM} ${startD}–${endM} ${endD}` }
}

export function formatEventTime(date: string): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) {
    return ''
  }
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}
