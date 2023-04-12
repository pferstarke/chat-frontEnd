import Icon from '@mdi/react';
import { mdiMessageBadgeOutline } from '@mdi/js';
import {useState, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {ChatContext} from '../../contexts/ChatContext';
import {unreadNotificationsFunc} from '../../utils/unreadNotifications';



const Notification = () => {

	const [isOpen, setIsOpen] = useState(false);
	const {user} = useContext(UserContext);
	const {notifications, userChats, allUsers} = useContext(ChatContext);
	
	const unreadNotifications = unreadNotificationsFunc(notifications);
	const modifiedNotifications = notifications.map((notif) => {
		const sender = allUsers.find(user => user._id === notif.senderId)

		return{
			...notif,
			senderName: sender?.name
		}
	})

	console.log('UN', unreadNotifications);
	console.log('MN', modifiedNotifications);

	return(
		<div className="notifications">
			<div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
				<Icon path={mdiMessageBadgeOutline} size={1} />
			</div>
			{!isOpen ?
			<div className="notifications-box">
				<div className="notifications-header">
					<h3>Notifications</h3>
					<div className="mark-as-read">
						Mark all as read
					</div>
				</div>
			</div>
			:
			<></>
			}
		</div>
	)
}

export default Notification;