import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useCheckUser = () => {
  const [isValidUser, setIsValidUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const currentDate = new Date();

  useEffect(() => {
    const userlogindate = localStorage.getItem('user_cached_date');

    const currentDateString = currentDate.toISOString().split('T')[0];

    const formattedDate = Number(currentDateString.replace(/-/g, ''));
    
    // console.log("Current date", formattedDate);
    // console.log("Logged in user date", userlogindate);

    if (formattedDate <= userlogindate) {
      setIsValidUser(true);
    } else {
      setIsValidUser(false);
      setError('Failed to load user data');
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  return { isValidUser, error };
}

export default useCheckUser;
