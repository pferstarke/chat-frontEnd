import {useContext, useState, useRef, useEffect} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {ChatContext} from '../../contexts/ChatContext';
import {RecipientFetcher} from '../../hooks/recipientFetcher';
import {Stack, Button} from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import Icon from '@mdi/react';
import {mdiSendVariant} from '@mdi/js';

export const ChatBox = ({chat}) => {
	const {user} = useContext(UserContext);
	const {currentChat, messages, isMessagesLoading, sendTextMessage} = useContext(ChatContext);
	const {recipientUser} = RecipientFetcher(chat, user);
	const [textMessage, setTextMessage] = useState('');
	const scroll = useRef();

	useEffect(() => {
		scroll.current?.scrollIntoView({behavior: 'smooth'})
	}, [messages])

	if(!chat){
		return <p style={{textAlign: 'center', width: '100%'}}>No selected conversation...</p>
	}
	// console.log('MESSAGING', messages)
	if(isMessagesLoading){
		return <p style={{textAlign: 'center', width: '100%'}}>Loading conversation...</p>
	}
	return(
		<Stack>
			<div className="chat-header">
				<strong>{recipientUser?.name}</strong>
			</div>
			<Stack gap={3} className="messages">
				{messages && messages.map((message, index) => 
					<Stack key={index} className={`${message?.senderId === user?._id ? 'message self align-self-end flex-grow-0' : 'message align-self-start flex-grow-0'}`} ref = {scroll}>
						<span>{message.text}</span>
						<span className="message-footer">{moment(message.createdAt).calendar()}</span>
					</Stack>
				)}
			</Stack>
			<Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
				<InputEmoji value={textMessage} onChange={setTextMessage} fontFamily="nunito" borderColor="rgba(72, 112, 223, 0.2"/>
				<button className="send-btn" onClick={() => sendTextMessage(textMessage, user, chat._id, setTextMessage)}>
					<Icon path={mdiSendVariant} size={1} />
				</button>
			</Stack>
		</Stack>
	)
}

