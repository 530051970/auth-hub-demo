import { AUTO_LOGOUT_TIME } from 'common/constants';
import React, { useEffect } from 'react';
import { logout } from 'request/authing';


const AutoLogout = ({ timeout = AUTO_LOGOUT_TIME }) => {
  useEffect(() => {
    let timer:any;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        logout();
        window.location.href = '/login';
      }, timeout);
    };

    const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [timeout]);

  return null;
};

export default AutoLogout;
