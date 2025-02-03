interface INotificationItem {
  text: string
  time: string
  newNotification: boolean
}

const keyWords = ['free', 'day', 'alert', 'great', 'news', 'favorite', 'meal']

function NotificationItem({ text, time, newNotification }: INotificationItem) {
  const escapedKeywords = keyWords.map((word: string) =>
    word.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  )
  const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi')

  const parts = text.split(regex)

  return (
    <div className={`notification ${newNotification ? 'newest_notification' : ''}`}>
      <p className="text">
        {parts.map((part, index) =>
          escapedKeywords.includes(part.toLowerCase()) ? <span key={index}>{part}</span> : part
        )}
      </p>
      <p className="time">{time}</p>
    </div>
  )
}

export default NotificationItem
