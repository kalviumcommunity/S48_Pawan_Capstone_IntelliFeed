import {React, useState } from 'react';
import signupBG from '../assets/signupBG.png'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'; 

 function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        username,
        email,
        password,
      });

      console.log(response.data); 
      alert('Signup successful!'); 
      navigate('/Login')
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Signup failed.';
      setErrorMessage(errorMsg); 
    }
  };

  return (
    <div className='h-screen w-screen bg-cover bg-center flex justify-center items-center' style={{ backgroundImage: `url(${signupBG})`,}}>
      <div className='flex flex-col justify-around items-center bg-gradient-to-b from-[#396B91] to-[#7AB1DB]
      w-1/4 h-4/5 p-10 rounded-md transform scale-90"'>
        <h1 className='text-4xl font-bold text-white'>Sign Up</h1>

        <div>
          <form onSubmit={handleSubmit}>
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <div><input className='m-2 p-2' type="text" placeholder='Enter your username'  value={username} onChange={(e) => setUsername(e.target.value)} /></div>
            <div><input className='m-2 p-2' type="email" placeholder='Enter your email'  value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><input className='m-2 p-2' type="password" placeholder='Enter your password'  value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <div><input className='m-2 p-2' type="password" placeholder='Confirm your password'  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}  /></div>
          <div className='flex flex-col justify-center items-center'>
          <button type="submit" className='font-sans bg-black text-white border-none px-4 py-2 m-2'>Signup</button>
          <Link className='underline' to="/Login">Already a user? Login</Link>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default Signup