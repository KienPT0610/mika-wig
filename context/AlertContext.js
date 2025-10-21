import { createContext, useCallback, useContext, useState } from "react";
import Alert from "../components/Alert";
import { content } from "../tailwind.config";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    type: '',
    content: '',
    visible: false
  });

  const showAlert = useCallback((type, content, duration = 5000) => {
    setAlert({ type, content, visible: true });
    if(duration > 0){
      setTimeout(() => {
        setAlert(prev => ({ ...prev, visible: false }));
      }, duration);
    }
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert.visible && <Alert type={alert.type} content={alert.content} />}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}