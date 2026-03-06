import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(rawDate: Date) {
  const formatedDate = format(rawDate, "LLLL dd 'at' h:mmaaa")
  const formatedDateRelativeToNow = formatDistanceToNow(rawDate, {
    addSuffix: true,
  })

  return {
    formatedDate,
    formatedDateRelativeToNow,
  }
}
