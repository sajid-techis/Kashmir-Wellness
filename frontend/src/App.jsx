import { useDispatch, useSelector } from 'react-redux';
import Router from './Router'
import { useEffect } from 'react';
import { getUserProfileThunk } from './features/users/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
        dispatch(getUserProfileThunk(token));
    }
  }, [dispatch, token]);

  return (
    <>
      <Router/>
      <ToastContainer/>
    </>
  )
}

export default App
