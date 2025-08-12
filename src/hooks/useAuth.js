import { useAuth as useAuthContext } from '../contexts/AuthContext.jsx';

export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;