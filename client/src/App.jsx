import {BrowserRouter, Routers,Router} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import SignIn from './pages/Signin';

export default function App() {
  return (
    <BrowserRouter>
    <Routers>
      <Router path='/' element={<Home />} />
      <Router path='/sign-up' element={<SignUp />} />
      <Router path='/sign-in' element={<SignIn />} />
      <Router path='/about' element={<About />} />
      <Router path='/profile' element={<Profile />} />
    </Routers>
    </BrowserRouter>
  )
}
