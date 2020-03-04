import React, {useRef, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const isLogged = () => !!localStorage.getItem('jwt');

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const httpRequest = async (url, method = 'GET', body, isPrivate = true) => {
  try{
    const res = await axios({
      method,
      url,
      headers: {
        ...(isPrivate && {'X-Session-ID': localStorage.getItem('jwt')}),
        'Content-Type': 'application/json'
      },
      ...(!!body && {data: JSON.stringify(body)})
    });
    return res.data;
  }catch(error){
    if(error.response.status === 401){
      logout();
    }else{
      throw error;
    }
  }

}

export const protect = (component, invert = false) =>
  invert
    ? isLogged()
      ? () => <Redirect to="/" />
      : component
    : isLogged()
    ? component
    : () => <Redirect to="/login" />;

export const logout = () => {
  localStorage.removeItem('jwt');
  window.location.replace('/login');
}
