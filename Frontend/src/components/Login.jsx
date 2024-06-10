import {React,useState} from 'react'
import signupBG from '../assets/signupBG.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });

      if (response.data.message === 'Login successful!') {
        navigate('/Feedpage');
        alert('Login successful!'); 
      } else {
        setErrorMessage(response.data.message); 
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className='h-screen w-screen bg-cover bg-center flex justify-center items-center' style={{ backgroundImage: `url(${signupBG})`,}}>
    <div className='flex flex-col justify-around items-center bg-gradient-to-b from-[#396B91] to-[#7AB1DB]
    w-1/4 h-3/5 p-10 rounded-md transform scale-90"'>
      <h1 className='text-4xl font-bold text-white'>Log in</h1>

      <div>
        <form onSubmit={handleSubmit}>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
          <div><input className='m-2 p-2' type="text" placeholder='Enter your username'
               value={username}
               onChange={(e) => setUsername(e.target.value)} /></div>
          <div><input className='m-2 p-2' type="text" placeholder='Enter your password'
               value={password}
               onChange={(e) => setPassword(e.target.value)} /></div>
          <div className='flex flex-col justify-center items-center'>
            <button type="submit" className='font-sans bg-black text-white border-none px-4 py-2 m-2'>Login</button>
            <Link className='underline' to="/Signup">Dont have an account? Signup.</Link>
          </div>
        </form>
      </div>

    </div>
  </div>
  )
}
