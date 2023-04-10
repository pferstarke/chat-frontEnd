import { useEffect, useState } from 'react';
import { baseUrl, getRequest } from '../utils/services';

export const RecipientFetcher = (chat, user) => {
	const [recipientUser, setRecipientUser] = useState(null);
	const [error, setError] = useState(null);

	const recipientId = chat?.members.find((id) => id !== user?._id)
	console.log('recId', recipientId)

	useEffect(() => {
		const getUser = async() => {
			if(!recipientId){
				return null;
			}
			else{
				const timestamp = Date.now(); // to avoid getting the same data more than once
				const response = await getRequest(`${baseUrl}/users/find/${recipientId}?_=${timestamp}`)
				// console.log('HOOK', response)

				if(response.error){
					return setError(response)
				}

				setRecipientUser(response)
			
			}
		}

		getUser();
	}, [recipientId])


	return {recipientUser};
}
