import { createContext } from 'react';

const AlertContext = createContext({
  type:'',
  message: '',
  setAlert: () => {}
});

export default AlertContext;