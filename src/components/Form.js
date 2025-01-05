import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import publicApi from '../publicApi';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constants';
import LoadingIndicator from './LoadingIndicator';
import smallLogo from './../Assets/Logo-mini-mobile.svg'

const Form = ({ isLogin = true }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: isLogin ? '' : undefined
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ isAllowed, setIsAllowed] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCombinedSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError('');
    setIsLoading(true);
  
    try {
      
      // Step 1: Check allowance if register
      if(!isLogin){
        const allowanceResponse = await publicApi.get(
          `/api/internships/check_allowance/?email=${formData.email}`, 
          { cache: 'no-store' }
        );
    
        const isAllowed = allowanceResponse.data.exists;
        setIsAllowed(isAllowed);
    
        if (!isAllowed) {
          //alert('You are not allowed to proceed.');
          setIsLoading(false);
          setError('You have not being enrolled to this internship. Please contact help@thehackbio.com if you think this is wrong.')
          return; // Exit if not allowed
        }
      }
      // Step 2: Proceed to handleSubmit logic if allowed
      const endpoint = isLogin ? 'api/token/' : 'api/user/register/';
      const submitResponse = await api.post(endpoint, formData);
  
      if (submitResponse.status === 200 || submitResponse.status === 201) {
        if (isLogin) {
          localStorage.setItem(ACCESS_TOKEN, submitResponse.data.access);
          localStorage.setItem(REFRESH_TOKEN, submitResponse.data.refresh);
          navigate('/');
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.detail || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className='items-center w-full  h-12' src={smallLogo} />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleCombinedSubmit}>
          <div>
            <label htmlFor="username" className="block text-md font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md border-0 h-10 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900 ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 h-10 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-md focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 h-10 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-md  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center items-center text-lg rounded-md bg-hackbio-green h-12 py-1.5 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? <LoadingIndicator /> : (isLogin ? 'Sign in' : 'Register')}
            </button>
          </div>
          <div className='w-full items-center text-center'>
            <a className='font-medium underline' href={isLogin? '/register': '/login'}>{ isLogin? 'First Time Here? Create and Account': 'Already have an account? Login Here' }</a>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Form;
