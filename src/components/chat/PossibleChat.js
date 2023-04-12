import { useContext } from 'react';
import {ChatContext} from '../../contexts/ChatContext';
import {UserContext} from '../../contexts/UserContext';

const PossibleChat = () => {
	const {user} = useContext(UserContext);
	const {possibleChats, createChat, onlineUsers} = useContext(ChatContext);

	// console.log('POSSIBLECHATS', possibleChats);
	return(
		<>
			<div className="all-users">
				{possibleChats && possibleChats.map((otherUsers, index) => {
					return(
						<div className="single-user" key={index} onClick={() => createChat(user._id, otherUsers._id)}>
							{otherUsers.name}
							<span className={onlineUsers?.some((user) => user?.userId === otherUsers?._id) ? "user-online" : ""}></span>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default PossibleChat;