import {React, useState } from 'react';
import signupBG from '../assets/signupBG.png'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'; 
import addPP from '../assets/addPP.png'

 function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(addPP);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate()

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      alert('Signup successful!');
      navigate('/Login');
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
          <div className='m-2 p-2'>
            <input
              type='file'
              id='profilePicture'
              style={{ display: 'none' }}
              onChange={handleProfilePictureChange}
            />
            <label htmlFor='profilePicture' className='cursor-pointer flex justify-center items-center'>
              <img
                src={profilePicturePreview}
                alt='Profile Preview'
                className={`w-14 h-14  ${profilePicturePreview === addPP ? '' : 'w-14 h-14 rounded-full'}`}
              />
            </label>
          </div>
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