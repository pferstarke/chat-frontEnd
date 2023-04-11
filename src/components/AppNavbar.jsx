import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {UserContext} from '../contexts/UserContext';

const AppNavbar = () => {

	const {user, logoutUser} = useContext (UserContext)

	return(
		<Navbar bg="dark" className="mb-4" style={{height: '3.75rem'}}>
			<Container>
				<h2>
					<Link to="/" className="link-light text-decoration-none">Chat Application</Link>
				</h2>
				{user &&<span className="text-warning">Logged in as {user?.name}</span>}
				<Nav>
					<Stack direction="horizontal" gap={3}>
						{
							user && (
								<Link onClick={() => logoutUser()}to="/login" className="link-light text-decoration-none">Logout</Link>
							)
						}
						{!user && (<>
							<Link to="/login" className="link-light text-decoration-none">Login</Link>
							<Link to="/register" className="link-light text-decoration-none">Register</Link>
						</>)}
					</Stack>
				</Nav>
			</Container>
		</Navbar>
	)
}

export default AppNavbar;