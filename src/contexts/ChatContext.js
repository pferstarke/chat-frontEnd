import {createContext, useState, useEffect, useCallback} from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatProvider = ({children, user}) => {
	

	const [userChats, setUserChats] = useState(null);
	const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
	const [userChatsError, setUserChatsError] = useState(null);

	const [possibleChats, setPossibleChats] = useState([]);

	const [currentChat, setCurrentChat] = useState(null);

	const [messages, setMessages] = useState(null);
	const [isMessagesLoading, setIsMessagesLoading] = useState(false);
	const [messagesError, setMessagesError] = useState(null);

	const [sendTextMessageError, setSentTextMessageError] = useState(null);
	const [newMessage, setNewMessage] = useState(null);

	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);

	const [notifications, setNotifications] = useState([]);

	const [allUsers, setAllUsers] = useState([]);

	

	/*initial socket*/
	useEffect(() => {
		const newSocket = io('http://localhost:4000');
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		}
	}, [user]);

	// add online users
	useEffect(() => {
	  if (socket) {
	    socket.emit('addNewUser', user?._id);
	    socket.on('showOnlineUsers', (response) => {
	    	setOnlineUsers(response);
	    })
	    return () => {
	    	socket.off('showOnlineUsers');
	    };
	  }

	}, [socket, user?._id]);

	// send message
	useEffect(() => {
		const recipientId = currentChat?.members.find((id) => id !== user?._id)
	 	if (socket) {
	    	socket.emit('sendMessage', {...newMessage, recipientId});
	  	}

	}, [newMessage]);

	// receive message
	useEffect(() => {
	 	if (socket) {
	    	socket.on('getMessage', response => {
	    		if(currentChat?._id !== response.chatId){
	    			return;
	    		}
	    		else{
	    			setMessages(previous => [...previous, response]);
	    		}
	    	});
	    	return () => {
	    		socket.off('getMessage')
	    	}
	  	}
	}, [socket, currentChat]);


	// get notifications
	// useEffect(() => {
	//  	if (socket) {
	//     	socket.on('getMessage', response => {
	//     		if(currentChat?._id !== response.chatId){
	//     			return;
	//     		}
	//     		else{
	//     			setMessages(previous => [...previous, response]);
	//     		}
	//     	});

	//     	socket.on('getNotification',(response) => {
	//     		const isChatRead = currentChat?.members.some(id => id === response.senderId)
	    		
	//     		if(isChatRead){
	//     			setNotifications(prev => [{...response, isRead: true}, ...prev])
	//     		}
	//     		else{
	//     			setNotifications(prev => [response, ...prev])
	//     		}
	//     	})

	//     	return () => {
	//     		socket.off('getMessage');
	//     		socket.off('getNotification');
	//     	}
	//   	}
	// }, [socket, currentChat]);


	useEffect(() => {
		const getUsers = async() =>{
			const response = await getRequest(`${baseUrl}/users/getUsers`);
			// console.log('RESSSSSSSSSSSSSS', response);
			if(response.error){
				return console.log('FETCHING ERROR', response);
			}

			const possChats = response.filter((fetchedUsers) => {
				
				let isChatCreated = false;

				if(user?._id === fetchedUsers._id){
					return false;
				}

				if(userChats){
					isChatCreated = userChats?.some(chat => {
						return chat.members[0] === fetchedUsers._id || chat.members[1] === fetchedUsers._id;
					})
				}

				return !isChatCreated;

			});

			setPossibleChats(possChats);
			setAllUsers(response);
		}

		getUsers();
	}, [userChats, user?._id]);

	useEffect(() => {
		const getUserChats = async()=> {
			if(user?._id){

				setIsUserChatsLoading(true);
				setUserChatsError(null);

				const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
				// console.log('ETO NAFETCH', response)
				setIsUserChatsLoading(false);

				if(response.error){
					return setUserChatsError(response);
				}

				setUserChats(response);
			}
		}

		getUserChats();
	}, [user])


	useEffect(() => {
		const getMessages = async ()=> {

			setIsMessagesLoading(true);
			setMessagesError(null);

			const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
			// console.log('CURRENT CHAT response', response)
			// console.log('CURRENT CHAT ID', response[0]._id)
			setIsMessagesLoading(false);
			// console.log('RESPONSE', response)
			// console.log('CURRENT CHAT', currentChat);

			if(response.error){
				return setMessagesError(response);
			}

			setMessages(response);
			
		}

		getMessages();
	}, [currentChat])


	const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMessage) => {
		if(!textMessage){
			return console.log('No text typed');
		}

		const response = await postRequest(`${baseUrl}/messages/create`, JSON.stringify({
			chatId: currentChatId,
			senderId: sender._id,
			text: textMessage
		}))

		if(response.error){
			return setSentTextMessageError(response);
		}

		setNewMessage(response);
		setMessages((previousState) => [...previousState, response])
		setTextMessage('');

	}, [])

	const updateCurrentChat = useCallback((chat) => {
		setCurrentChat(chat);
	}, [])


	const createChat = useCallback(async(firstId, secondId) => {
		const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
			firstId,
			secondId
		}));

		if(response.error){
			return console.log('ERROR CREATING CHAT', response);
		}

		setUserChats((prevState) => [...prevState, response]);

	}, [])

	return(
		<ChatContext.Provider value={{
			userChats,
			isUserChatsLoading,
			userChatsError,
			possibleChats,
			createChat,
			updateCurrentChat,
			messages,
			isMessagesLoading,
			messagesError,
			sendTextMessage,
			onlineUsers,
			notifications,
			allUsers
		}}>
			{children}
		</ChatContext.Provider>
	)
}