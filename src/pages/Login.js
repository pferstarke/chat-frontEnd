import {Alert, Button, Form, Row, Col, Stack } from 'react-bootstrap';
import {UserContext} from '../contexts/UserContext';
import { useContext } from 'react';

const Login = () => {

	const {loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading} = useContext(UserContext);

	return(
		<>
			<Form onSubmit={loginUser}>
				<Row 
					style={{
						height: '100vh',
						justifyContent: 'center',
						paddingTop: '10%'
					}}
				>
					<Col xs={6}>
						<Stack gap={3}>
							<h2>Login</h2>
							<Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}/>
							<Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}/>
							<Button variant="primary" type="submit">{isLoginLoading? 'Signing in..' : 'Login'}</Button>
							{loginError?.error && 
							<Alert variant="danger">{loginError?.message}</Alert>}
						</Stack>
					</Col>
				</Row>
			</Form>
		</>
	)
}

export default Login;