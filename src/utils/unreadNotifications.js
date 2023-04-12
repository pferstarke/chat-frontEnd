

export const unreadNotificationsFunc = (notifications) => {


	return notifications.filter((notif) => notif.isRead === false)
}