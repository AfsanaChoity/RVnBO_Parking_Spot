import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout } from './slices/authSlice';
import { setRole, resetRole } from './slices/userRoleSlice';

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return {
    user,
    token,
    isAuthenticated,
    setCredentials: (data) => dispatch(setCredentials(data)),
    logout: () => dispatch(logout()),
  };
};

export const useUserRole = () => {
  const role = useSelector((state) => state.userRole.role);
  const dispatch = useDispatch();

  return {
    role,
    setRole: (role) => dispatch(setRole(role)),
    resetRole: () => dispatch(resetRole()),
  };
};
