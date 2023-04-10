import { useContext } from 'react';
import {ChatContext} from '../../contexts/ChatContext';
import {UserContext} from '../../contexts/UserContext';

const PossibleChat = () => {
	const {user} = useContext(UserContext);
	const {possibleChats, createChat} = useContext(ChatContext);

	// console.log('POSSIBLECHATS', possibleChats);
	return(
		<>
			<div className="all-users">
				{possibleChats && possibleChats.map((fetchedUsers, index) => {
					return(
						<div className="single-user" key={index} onClick={() => createChat(user._id, fetchedUsers._id)}>
							{fetchedUsers.name}
							<span className="user-online"></span>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default PossibleChat;