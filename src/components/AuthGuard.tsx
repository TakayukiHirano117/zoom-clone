import { Navigate, Outlet } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '../modules/auth/current-user.state';

const AuthGuard = () => {
  const currentUser = useAtomValue(currentUserAtom);
  console.log(currentUser);

  if (currentUser == null) return <Navigate to="/login" />;

  return <Outlet />;
};

export default AuthGuard;
