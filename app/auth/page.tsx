"use client"
import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";

const AuthPage = () => {
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState(''); 
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, [])

  const register = useCallback(async () => {
      try{
        await axios.post('/api/register', {
          email, 
          name, 
          password
        })
      } catch(error){
        console.error(error);
      }
  }, [email, name, password])
  
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className="h-full w-full bg-black lg:bg-black/50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        
        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                  <Input 
                id="username"
                label="User"
                onChange={(e) => setName(e.target.value)}
                value={name}
                />

              )}
              <Input 
              id="email"
              type="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              />
              <Input 
              id="password"
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
            </div>
            <button onClick={register} className="bg-red-600 py-3 text-white w-full cursor-pointer hover:bg-red-700 transition mt-10 rounded-md">
              {variant === 'login' ? 'Login' : 'Register'}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}

              <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggleVariant}>
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
