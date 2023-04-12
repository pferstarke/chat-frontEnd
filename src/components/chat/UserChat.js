import {RecipientFetcher} from '../../hooks/recipientFetcher';
import { Stack } from 'react-bootstrap';
import avatar from '../../avatar/avatar.svg';
import {ChatContext} from '../../contexts/ChatContext';
import {useContext} from 'react';
import moment from 'moment';

const UserChat = ({chat, user}) => {

	const {recipientUser} = RecipientFetcher(chat, user)
	const {currentChat, messages, isMessagesLoading, onlineUsers} = useContext(ChatContext);

	const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)
	// console.log('RUSER', messages);

	return(
		<Stack 
			direction="horizontal" 
			gap={3} 
			className="user-card align-items-center p-2 justify-content-between"
			role="button"
		>
			<div className="d-flex">
				<div className="me-2"> 
					<img src={avatar} height="35px" alt="ava"/>
				</div>
				<div className="me-2">
					<div className="name">{recipientUser?.name}</div>
					<div className="text">text message</div>
				</div>
			</div>
			<div className="d-flex flex-column align-items-end">
				<div className="date">
					{/*{moment(messages.createdAt).calendar()}*/}
				</div>
				<div className="this-user-notifications">2</div>
				<span className={isOnline ? "user-online" : ""}></span>
			</div>
		</Stack>
	)
}

export default UserChat;