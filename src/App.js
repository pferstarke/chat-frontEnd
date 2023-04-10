// import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';

import AppNavbar from './components/AppNavbar';


import { UserContext} from './contexts/UserContext'
import { ChatProvider } from './contexts/ChatContext';

function App() {
  const {user} = React.useContext (UserContext)
  // console.log(user)
  
 /* 
   const [user, setUser] = useState({
      'id': localStorage.getItem('id')
    })

    console.log(user);

    const unsetUser = () => {
      localStorage.clear();
    }

    useEffect(() => {
      fetch(`${process.env.API_URL}/users/findUser`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(result => result.json())
      .then(data => {
        if(typeof data._id !== undefined){
          setUser({
            id: data._id,
            email: data.email
          })
        }
        else{
          setUser({
            id: null,
            email: null
          })
        }

        console.log(data);
      })


    }, [])
  */


  // const {user} = React.useContext(UserContext);
  
  return (
    
   <>
{/*   // <ChatProvider user={user}>
   //  <AppNavbar />
   //  <Container >
   
   //    <Routes>
   //      <Route path="/" element={user? <Chat /> : <Login />} />
   //      <Route path="/register" element={user? <Chat /> : <Register />} />
   //      <Route path="/login" element={user? <Chat /> : <Login />} />
   //      <Route path="*" element={<Navigate to="/" />} />
   //    </Routes>
    
   //  </Container>
   //  </ChatProvider>*/}
        <ChatProvider user={user}>
          <AppNavbar />
          <Container >
            <Routes>
              <Route path="/" element={user? <Chat /> : <Login />} />
              <Route path="/register" element={user? <Chat /> : <Register />} />
              <Route path="/login" element={user? <Chat /> : <Login />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container >
        </ChatProvider>
   </>
    
    
  );
}

export default App;
