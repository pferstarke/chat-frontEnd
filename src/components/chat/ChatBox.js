import {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {ChatContext} from '../../contexts/ChatContext';
import {RecipientFetcher} from '../../hooks/recipientFetcher';

const ChatBox = () => {
	const {user} = useContext(UserContext);
	const {currentChat, messages, isMessagesLoading} = useContext(ChatContext);
	const {recipientUser} = RecipientFetcher(currentChat, user);
	// console.log(recipientUser)
	if(!recipientUser){
		return <p style={{textAlign: 'center', width: '100%'}}>No selected conversation...</p>
	}
	console.log('MESSAGING', messages)
	if(isMessagesLoading){
		return <p style={{textAlign: 'center', width: '100%'}}>Loading conversation...</p>
	}
	return(
		<>NAME: {recipientUser?.name}
			MESSAGE: {recipientUser?.messages}
		</>
	)
}

export default ChatBox;