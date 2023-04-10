import { createContext , useState, useCallback, useEffect } from 'react';
import { baseUrl, postRequest } from '../utils/services';


export const UserContext = createContext();

export const UserProvider = ({children}) => {
	const timestamp = Date.now();

	const [user, setUser] = useState(null);
	const[registerError, setRegisterError] = useState(null);
	const[isRegisterLoading, setIsRegisterLoading] = useState(false );
	const [registerInfo, setRegisterInfo] = useState({
		name: "",
		email: "",
		password: ""
	})


	const[loginError, setLoginError] = useState(null);
	const[isLoginLoading, setIsLoginLoading] = useState(false );
	const [loginInfo, setLoginInfo] = useState({
		name: "",
		email: "",
		password: ""
	})

	// console.log('USER', user);
	// console.log(registerInfo);
	// console.log('LOGININFO', loginInfo);

	useEffect(() => {
		const user = localStorage.getItem('User');

		setUser(JSON.parse(user));
	}, [])

	const updateRegisterInfo = useCallback(info => {
		setRegisterInfo(info);
	}, [])

	const updateLoginInfo = useCallback(info => {
		setLoginInfo(info);
	}, [])

	const registerUser = useCallback(async(e) =>{
		e.preventDefault();

		setIsRegisterLoading(true)
		setRegisterError(null);

		const response = await postRequest(`${baseUrl}/users/register?_=${timestamp}`, JSON.stringify(registerInfo));

		setIsRegisterLoading(false)

		if(response.error){
			return setRegisterError(response);
		}

		localStorage.setItem('User', JSON.stringify(response));
		setUser(response);

	}, [registerInfo])


	const loginUser = useCallback(async(e) => {

		e.preventDefault();

		setIsLoginLoading(true);
		setLoginError(null);


		const response = await postRequest(`${baseUrl}/users/login?_=${timestamp}`, JSON.stringify(loginInfo));

		setIsLoginLoading(false);

		if(response.error){
			return setLoginError(response)
		}

		localStorage.setItem('User', JSON.stringify(response))
		setUser(response);
		
	}, [loginInfo])


	const logoutUser = useCallback(() => {
		localStorage.clear();
		setUser(null);
	}, [])

	return(
		<UserContext.Provider
			value={{
				user,
				registerInfo,
				updateRegisterInfo,
				registerUser,
				registerError,
				isRegisterLoading,
				logoutUser,
				loginUser,
				loginError,
				loginInfo,
				updateLoginInfo,
				isLoginLoading
			}}
		>
			{children}
		</UserContext.Provider>
	)
}