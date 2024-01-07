import React from 'react';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import pinItlogo from '../assets/pinItlogo.svg';
import { jwtDecode } from 'jwt-decode';
import { client } from '../client';


const Login = () => {
  const navigate=useNavigate();
  return (
    <div className='flex justify-start  items-center flex-col h-screen'>
      <div className='relative h-full w-full'>
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className='h-full w-full object-cover'
        />

        <div className='absolute flex flex-col left-0 bottom-0 top-0 right-0 justify-center items-center bg-blackOverlay'>
          <div className='p-5'>
            <img
              src={pinItlogo}
              width='130px'
              alt='logo'
            />
          </div>

          <div className='shadow-2xl'>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const decoded=jwtDecode(credentialResponse.credential)
                  localStorage.setItem('user',JSON.stringify(decoded));
                  const {name,sub,picture}=decoded;
                  
                  const doc={
                    _id:sub,
                    _type:'user',
                    userName:name,
                    image:picture,
                  }

                  client.createIfNotExists(doc)
                  .then(()=>{
                    navigate('/',{replace:true})
                  });
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>

          </div>
        </div>
      </div>
    </div>
  )
}
export default Login