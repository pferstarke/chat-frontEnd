import { useContext  } from 'react';
// import { ChatContext } from '../contexts/ChatContext';
import { ChatContext } from '../contexts/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserChat from '../components/chat/UserChat';
import { UserContext } from '../contexts/UserContext'
import PossibleChat from '../components/chat/PossibleChat';
import ChatBox from '../components/chat/ChatBox';

const Chat = () => {

	const {user} =  useContext(UserContext);

	const {userChats, isUserChatsLoading, updateCurrentChat } =  useContext(ChatContext);

	// console.log('USERCHATS', userChats);

	return(
		<Container>
			<PossibleChat />
			{userChats?.length < 1? null :
			<Stack direction="horizontal" gap={4} className="align-items-start">
				<Stack className="messages-box flex-grow-0 pe-3" gap={3}>
					{isUserChatsLoading && <p>Loading Chats...</p>}
					{userChats?.map((chat, index) => {
						return(
							<div key={index} onClick={() => updateCurrentChat(chat)}>
								<UserChat chat={chat} user={user} />
							</div>
						)
					})  }
				</Stack>
				<ChatBox />
			</Stack>
			}
		</Container>
	)
}

export default Chat;