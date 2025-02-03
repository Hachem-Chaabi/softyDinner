import NotificationItem from '../NotificationItem/NotificationItem'

function NotificationDropdown() {
  return (
    <div className="notification_dropdown">
      <NotificationItem
        text="Free day alert! No dishes for 14-01-2025, but we'll have
          something delicious for you soon!"
        time="10:00"
        newNotification={true}
      />

      <NotificationItem
        text="Great news! Your favorite meal is on tonight's dinner menu. Enjoy!"
        time="09:00"
        newNotification={false}
      />

      <NotificationItem
        text="Tonight's dinner is your favorite! Don't miss out!"
        time="01-01-2025"
        newNotification={false}
      />
    </div>
  )
}

export default NotificationDropdown
